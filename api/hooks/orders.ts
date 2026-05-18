import { useMedusaSdk } from '@/contexts/auth';
import { useSettings } from '@/contexts/settings';
import { showErrorToast } from '@/utils/errors';
import { paymentService } from '@/utils/payment/PaymentService';
import { shortenXfield } from '@/utils/payment/xfield';
import { AdminOrder, AdminOrderFilters, AdminOrderListResponse } from '@medusajs/types';
import {
  DefaultError,
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useMutation,
  UseMutationOptions,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const PER_PAGE = 20;

export const useOrders = (
  query?: Omit<AdminOrderFilters, 'limit' | 'offset'>,
  limit = PER_PAGE,
  options?: Omit<
    UndefinedInitialDataInfiniteOptions<
      AdminOrderListResponse,
      unknown,
      InfiniteData<AdminOrderListResponse>,
      readonly unknown[],
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
  >,
) => {
  const sdk = useMedusaSdk();

  return useInfiniteQuery({
    queryKey: ['orders', JSON.stringify(query ?? {})],
    queryFn: async ({ pageParam = 1 }) => {
      return sdk.admin.order.list({
        ...query,
        limit,
        offset: (pageParam - 1) * limit,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = (lastPage.offset + lastPage.limit) / limit + 1;
      return lastPage.count > lastPage.offset + lastPage.limit ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const prevPage = (firstPage.offset + firstPage.limit) / limit - 1;
      return prevPage >= 1 ? prevPage : undefined;
    },
    ...options,
  });
};

export const useOrder = (orderId: string) => {
  const sdk = useMedusaSdk();

  return useQuery({
    queryKey: ['orders', 'order', orderId],
    queryFn: async () => {
      return sdk.admin.order.retrieve(orderId, {
        fields:
          '+tax_total,+discount_total,+subtotal,+total,+items.variant.options.*,+items.variant.options.option.*,+items.variant.inventory_quantity,+customer.*,+metadata,+payment_status,+payment_collections.*,+payment_collections.payments.*,+fulfillments.*,+fulfillments.items.*',
      });
    },
    enabled: !!orderId,
  });
};

export type RefundOrderInput = {
  order: AdminOrder;
  /** Amount to refund in agorot. Defaults to the full paid amount. */
  amount?: number;
};

export type RefundOrderResult = {
  /** Which path was taken */
  method: 'void' | 'refund';
};

/**
 * Refunds (or voids) a completed POS order.
 *
 * Decision logic:
 * - If `order.metadata.caspit_uid` exists → **void** (same-day cancel, no card needed).
 *   Void is only valid before end-of-day Shva transmission.
 * - Otherwise → **independent refund** (cardholder taps card again on terminal).
 *
 * After the terminal approves, records the refund in Medusa via the payment SDK
 * so the order's `refunded_amount` is updated correctly.
 */
export const useRefundOrder = (
  options?: Omit<
    UseMutationOptions<RefundOrderResult, DefaultError, RefundOrderInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const sdk = useMedusaSdk();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['orders', 'refund'],
    mutationFn: async ({ order, amount }: RefundOrderInput): Promise<RefundOrderResult> => {
      const refundAmount = amount ?? order.total;
      const caspitUid = order.metadata?.caspit_uid as string | undefined;

      // Use void if we have the uid and the order was paid today (same-day cancel)
      if (caspitUid) {
        const result = await paymentService.void({
          originalUid: caspitUid,
          xfield: shortenXfield(`V${order.id}`),
          amount: refundAmount,
          creditTerms: '1',
          tranType: '1',
        });

        if (!result.success) {
          throw new Error(result.errorMessage ?? `Terminal void failed (${result.errorCode})`);
        }
      } else {
        // Independent refund — cardholder taps card on terminal
        const result = await paymentService.refund({
          amount: refundAmount,
          xfield: shortenXfield(`R${order.id}`),
        });

        if (!result.success) {
          throw new Error(result.errorMessage ?? `Terminal refund failed (${result.errorCode})`);
        }
      }

      // Record the refund in Medusa so payment_status updates correctly
      const payment = order.payment_collections
        ?.flatMap((col) => col.payments ?? [])
        .find((p) => (p.captured_amount ?? 0) > 0);

      if (payment) {
        await sdk.admin.payment.refund(payment.id, { amount: refundAmount });
      }

      return { method: caspitUid ? 'void' : 'refund' };
    },
    ...options,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['orders', 'order', variables.order.id] });
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      return options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      showErrorToast(error);
      return options?.onError?.(error, variables, context);
    },
  });
};

export type FulfillOrderInput = {
  order: AdminOrder;
};

/**
 * Fulfills all unfulfilled items in a POS order and immediately marks them as shipped.
 *
 * POS assumption: the customer is present and takes items immediately, so
 * createFulfillment → createShipment happens in a single action with no tracking info.
 */
export const useFulfillOrder = (
  options?: Omit<
    UseMutationOptions<void, DefaultError, FulfillOrderInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const sdk = useMedusaSdk();
  const queryClient = useQueryClient();
  const settings = useSettings();

  return useMutation({
    mutationKey: ['orders', 'fulfill'],
    mutationFn: async ({ order }: FulfillOrderInput): Promise<void> => {
      const unfulfilledItems = order.items
        ?.filter((item) => item.quantity - (item.detail?.fulfilled_quantity ?? 0) > 0)
        .map((item) => ({
          id: item.id,
          quantity: item.quantity - (item.detail?.fulfilled_quantity ?? 0),
        }));

      if (!unfulfilledItems?.length) {
        throw new Error('No items left to fulfill');
      }

      const locationId = settings.data?.stock_location?.id;
      console.log('[fulfillOrder] step: createFulfillment', {
        orderId: order.id,
        locationId,
        items: unfulfilledItems,
      });

      try {
        await sdk.admin.order.createFulfillment(order.id, {
          items: unfulfilledItems,
          ...(locationId ? { location_id: locationId } : {}),
          no_notification: true,
        });
        console.log('[fulfillOrder] createFulfillment done');
      } catch (e: any) {
        console.error('[fulfillOrder] createFulfillment failed', e?.status, JSON.stringify({
          message: e?.message,
          statusText: e?.statusText,
          type: e?.type,
          response: e?.response,
        }));
        throw e;
      }

      // Re-fetch to get the new fulfillment with its item IDs for shipment creation
      const { order: refreshed } = await sdk.admin.order.retrieve(order.id, {
        fields: '+fulfillments.*,+fulfillments.items.*',
      });

      const newFulfillment = refreshed.fulfillments?.find(
        (f) => !order.fulfillments?.some((existing) => existing.id === f.id),
      );

      if (newFulfillment) {
        const fulfillmentWithItems = newFulfillment as typeof newFulfillment & {
          items?: { id: string; quantity: number }[];
        };
        const shipmentItems = (fulfillmentWithItems.items ?? []).map((fi) => ({
          id: fi.id,
          quantity: fi.quantity,
        }));
        if (shipmentItems.length > 0) {
          console.log('[fulfillOrder] step: createShipment', {
            fulfillmentId: newFulfillment.id,
            items: shipmentItems,
          });
          try {
            await sdk.admin.order.createShipment(order.id, newFulfillment.id, {
              items: shipmentItems,
              no_notification: true,
            });
            console.log('[fulfillOrder] createShipment done');
          } catch (e: any) {
            console.error('[fulfillOrder] createShipment failed', e?.status, JSON.stringify({
              message: e?.message,
              statusText: e?.statusText,
            }));
            throw e;
          }
        }
      }
    },
    ...options,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['orders', 'order', variables.order.id] });
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      return options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      showErrorToast(error);
      return options?.onError?.(error, variables, context);
    },
  });
};
