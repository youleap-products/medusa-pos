import { useCustomers } from '@/api/hooks/customers';
import {
  DRAFT_ORDER_DEFAULT_CUSTOMER_EMAIL,
  useAddPromotion,
  useCompleteDraftOrder,
  useCurrentDraftOrder,
  useDraftOrderOrOrder,
  useDraftOrderPromotions,
  useRemovePromotion,
  useUpdateDraftOrderCustomer,
} from '@/api/hooks/draft-orders';
import { Form } from '@/components/form/Form';
import { FormButton } from '@/components/form/FormButton';
import { TextField } from '@/components/form/TextField';
import { ChevronDown } from '@/components/icons/chevron-down';
import { ShoppingCart } from '@/components/icons/shopping-cart';
import { Tag } from '@/components/icons/tag';
import { Trash2 } from '@/components/icons/trash-2';
import { UserRoundPlus } from '@/components/icons/user-round-plus';
import { X } from '@/components/icons/x';
import { InfoBanner } from '@/components/InfoBanner';
import { CheckoutSkeleton } from '@/components/skeletons/CheckoutSkeleton';
import { SwipeableListItem } from '@/components/SwipeableListItem';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Layout } from '@/components/ui/Layout';
import { Text } from '@/components/ui/Text';
import { useSettings } from '@/contexts/settings';
import { paymentService } from '@/utils/payment/PaymentService';
import { shortenXfield } from '@/utils/payment/xfield';
import { formatDate } from '@/utils/date';
import { AdminDraftOrder, AdminOrderLineItem, AdminPromotion } from '@medusajs/types';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, TouchableOpacity, View } from 'react-native';
import * as z from 'zod/v4';

type PaymentMethod = 'card' | 'cash';
type PaymentState = 'idle' | 'charging' | 'success' | 'failed';

interface PaymentError {
  code?: string;
  message?: string;
}

// ─── Cart item (left panel) ───────────────────────────────────────────────────

const DraftOrderItem: React.FC<{ item: AdminOrderLineItem }> = ({ item }) => {
  const settings = useSettings();
  const draftOrder = useCurrentDraftOrder();
  const thumbnail = item.thumbnail || item.product?.thumbnail || item.product?.images?.[0]?.url;

  return (
    <View className="flex-row gap-4 bg-panel py-5">
      <View className="h-20 w-20 overflow-hidden rounded-xl bg-gray-700">
        {thumbnail && <Image source={{ uri: thumbnail }} className="h-full w-full object-cover" />}
      </View>
      <View className="flex-1 flex-col gap-1">
        <Text className="text-white">{item.product_title}</Text>
        {item.variant?.options && item.variant.options.length > 0 && (
          <View className="flex-row flex-wrap gap-x-2 gap-y-1">
            {item.variant.options.map((option) => (
              <View className="flex-row gap-1" key={option.id}>
                <Text className="text-xs text-gray-400">{option.option?.title || option.option_id}:</Text>
                <Text className="text-xs text-gray-300">{option.value}</Text>
              </View>
            ))}
          </View>
        )}
        <Text className="text-sm text-gray-400">× {item.quantity}</Text>
      </View>
      <Text className="ml-auto font-mono text-white">
        {(item.unit_price * item.quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: draftOrder.data?.draft_order.region?.currency_code || settings.data?.region?.currency_code,
          currencyDisplay: 'narrowSymbol',
        })}
      </Text>
    </View>
  );
};

// ─── Customer badge (right panel) ────────────────────────────────────────────

const CustomerBadge: React.FC<{ customer: AdminDraftOrder['customer'] }> = ({ customer }) => {
  const updateDraftOrder = useUpdateDraftOrderCustomer();
  const defaultCustomer = useCustomers({ email: DRAFT_ORDER_DEFAULT_CUSTOMER_EMAIL }, 1);

  if (!customer || customer.email === DRAFT_ORDER_DEFAULT_CUSTOMER_EMAIL) {
    return (
      <Button
        onPress={() => router.push('/customer-lookup')}
        variant="outline"
        icon={<UserRoundPlus size={20} />}
        className="mb-4 justify-between border-gray-600"
      >
        Add Customer
      </Button>
    );
  }

  const customerName = [customer.first_name, customer.last_name].filter(Boolean).join(' ');

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: '/customer-lookup', params: { customerId: customer.id } })
      }
      className="mb-4 flex-row items-center justify-between border-b border-gray-700 pb-4"
    >
      <View>
        {customerName.length > 0 ? (
          <>
            <Text className="text-white">{customerName}</Text>
            <Text className="text-sm text-gray-400">{customer.email}</Text>
          </>
        ) : (
          <>
            <Text className="text-sm text-gray-400">Customer</Text>
            <Text className="text-white">{customer.email}</Text>
          </>
        )}
      </View>
      <View className="flex-row">
        <View className="p-2">
          <ChevronDown size={20} color="#9CA3AF" />
        </View>
        <TouchableOpacity
          onPress={() => updateDraftOrder.mutate(defaultCustomer.data?.pages[0].customers?.[0])}
          className="p-2"
        >
          <X size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// ─── Promotion badge + item (right panel) ────────────────────────────────────

const addPromotionFormSchema = z.object({
  promotionCode: z.string().min(1, 'Promotion code is required'),
});

interface PromotionBadgeProps {
  onAddPromotion: (code: string) => void;
  isAddingPromotion: boolean;
}

const PromotionBadge: React.FC<PromotionBadgeProps> = ({ onAddPromotion, isAddingPromotion }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        onPress={() => setIsDialogOpen(true)}
        variant="outline"
        icon={<Tag size={16} />}
        className="mb-3 justify-between border-gray-600"
      >
        Add Promotion
      </Button>
      <Dialog visible={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Add Promotion Code">
        <Form
          schema={addPromotionFormSchema}
          onSubmit={(data, form) => {
            onAddPromotion(data.promotionCode);
            form.reset();
            setIsDialogOpen(false);
          }}
          className="gap-4"
        >
          <TextField
            placeholder="Enter promotion code"
            name="promotionCode"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="characters"
            enterKeyHint="send"
            autoFocus
          />
          <View className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onPress={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <FormButton className="flex-1" isPending={isAddingPromotion}>
              Apply
            </FormButton>
          </View>
        </Form>
      </Dialog>
    </>
  );
};

interface TPromotionItem extends AdminPromotion {
  discount_amount: number;
}

const PromotionItem: React.FC<{
  item: TPromotionItem;
  onRemove?: (item: TPromotionItem) => Promise<void>;
  currencyCode: string | undefined;
}> = ({ item, onRemove, currencyCode }) => {
  const isAutomatic = item.is_automatic === true;

  return (
    <SwipeableListItem
      rightClassName="bg-panel"
      rightWidth={isAutomatic ? undefined : 64}
      rightContent={
        isAutomatic ? undefined : (
          <View className="h-full w-full flex-1 items-center justify-center p-1">
            <Pressable
              className="h-full w-full flex-1 items-center justify-center rounded-xl bg-error-500"
              onPress={async () => onRemove?.(item)}
            >
              <Trash2 size={20} color="white" />
            </Pressable>
          </View>
        )
      }
    >
      <View className="flex-row items-center gap-3 bg-panel py-3">
        <View className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-900">
          <Tag size={20} color="#10B981" />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium text-white">{item.code || 'Promotion'}</Text>
          <Text className="text-xs text-gray-400">{isAutomatic ? 'Automatic' : 'Code'}</Text>
        </View>
        <Text className="font-mono text-sm text-green-400">
          {(item.discount_amount * -1).toLocaleString('en-US', {
            style: 'currency',
            currency: currencyCode,
            currencyDisplay: 'narrowSymbol',
          })}
        </Text>
      </View>
    </SwipeableListItem>
  );
};

// ─── Charging overlay (right panel takeover) ─────────────────────────────────

const ChargingOverlay: React.FC<{
  amount: string;
  onCancel: () => void;
}> = ({ amount, onCancel }) => (
  <View className="flex-1 items-center justify-center gap-6 px-6">
    <ActivityIndicator size="large" color="#A3E635" />
    <View className="items-center gap-2">
      <Text className="text-4xl font-mono font-bold text-white">{amount}</Text>
      <Text className="text-lg text-white">Waiting for payment</Text>
      <Text className="text-sm text-gray-400 text-center">
        Present card on terminal
      </Text>
    </View>
    <Button variant="outline" className="border-gray-600 w-full" onPress={onCancel}>
      Cancel
    </Button>
  </View>
);

// ─── Success overlay ──────────────────────────────────────────────────────────

const SuccessOverlay: React.FC<{
  amount: string;
  pan?: string;
  cardName?: string;
}> = ({ amount, pan, cardName }) => (
  <View className="flex-1 items-center justify-center gap-6 px-6">
    <View className="h-20 w-20 items-center justify-center rounded-full bg-green-900">
      <Text className="text-4xl">✓</Text>
    </View>
    <View className="items-center gap-1">
      <Text className="text-2xl font-bold text-green-400">Payment approved</Text>
      <Text className="text-3xl font-mono font-bold text-white">{amount}</Text>
      {(cardName || pan) && (
        <Text className="text-sm text-gray-400">
          {[cardName, pan].filter(Boolean).join(' · ')}
        </Text>
      )}
    </View>
    <Text className="text-sm text-gray-500">Completing order…</Text>
  </View>
);

// ─── Failed overlay ───────────────────────────────────────────────────────────

const FailedOverlay: React.FC<{
  error: PaymentError;
  onRetry: () => void;
  onCancel: () => void;
}> = ({ error, onRetry, onCancel }) => (
  <View className="flex-1 items-center justify-center gap-6 px-6">
    <View className="h-20 w-20 items-center justify-center rounded-full bg-red-900">
      <Text className="text-4xl">✕</Text>
    </View>
    <View className="items-center gap-2">
      <Text className="text-2xl font-bold text-red-400">Payment declined</Text>
      {error.message && (
        <Text className="text-sm text-gray-400 text-center">{error.message}</Text>
      )}
      {error.code && (
        <Text className="text-xs text-gray-500">{error.code}</Text>
      )}
    </View>
    <View className="w-full gap-3">
      <Button onPress={onRetry} className="w-full bg-lime-400">
        Try Again
      </Button>
      <Button variant="outline" onPress={onCancel} className="w-full border-gray-600">
        Cancel
      </Button>
    </View>
  </View>
);

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function CheckoutScreen() {
  const pathName = usePathname();
  const { draftOrderId } = useLocalSearchParams<{ draftOrderId: string }>();
  const settings = useSettings();
  const draftOrder = useDraftOrderOrOrder(draftOrderId);
  const currentDraftOrder = useCurrentDraftOrder();
  const completeOrder = useCompleteDraftOrder(draftOrderId);

  const addPromotion = useAddPromotion();
  const removePromotion = useRemovePromotion();

  const draftOrderPromotionCodes = React.useMemo(() => {
    const allCodes =
      draftOrder.data?.items
        .flatMap((item) => item.adjustments?.map((adj) => adj.code))
        .filter((code) => typeof code === 'string') ?? [];
    return Array.from(new Set(allCodes));
  }, [draftOrder.data]);

  const addedPromotions = useDraftOrderPromotions(draftOrderPromotionCodes);

  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethod>('card');
  const [paymentState, setPaymentState] = React.useState<PaymentState>('idle');
  const [paymentError, setPaymentError] = React.useState<PaymentError>({});
  const [paymentMeta, setPaymentMeta] = React.useState<{ pan?: string; cardName?: string }>({});

  const currencyCode =
    draftOrder.data?.region?.currency_code || settings.data?.region?.currency_code;

  const formattedTotal = React.useMemo(
    () =>
      (draftOrder.data?.total ?? 0).toLocaleString('en-US', {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }),
    [draftOrder.data?.total, currencyCode],
  );

  const handlePay = React.useCallback(async () => {
    if (!draftOrder.data?.total || !draftOrderId) return;

    if (selectedMethod === 'cash') {
      completeOrder.mutate();
      return;
    }

    setPaymentState('charging');
    setPaymentError({});

    try {
      const result = await paymentService.charge({
        amount: draftOrder.data.total,
        orderId: shortenXfield(draftOrderId),
      });

      if (result.success) {
        setPaymentMeta({ pan: result.pan, cardName: result.cardName });
        setPaymentState('success');
        setTimeout(() => completeOrder.mutate(), 1500);
      } else {
        setPaymentError({ code: result.errorCode, message: result.errorMessage });
        setPaymentState('failed');
      }
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      setPaymentError({ code: e.code, message: e.message });
      setPaymentState('failed');
    }
  }, [draftOrder.data?.total, draftOrderId, selectedMethod, completeOrder]);

  const handleCancelPayment = React.useCallback(() => {
    setPaymentState('idle');
    setPaymentError({});
  }, []);

  const renderItem = React.useCallback<ListRenderItem<AdminOrderLineItem>>(
    ({ item }) => <DraftOrderItem item={item} />,
    [],
  );

  const isDraftOrder = draftOrder.data?.status === 'draft';
  const isPaymentActive = paymentState !== 'idle';

  if (draftOrder.isLoading || settings.isLoading) return <CheckoutSkeleton />;

  if (draftOrder.isError || settings.isError) {
    return (
      <Layout className="bg-canvas">
        <Text className="text-4xl text-white">Checkout</Text>
        <View className="flex-1 items-center justify-center gap-2">
          <InfoBanner variant="ghost" colorScheme="error" className="w-40">
            Failed to load cart
          </InfoBanner>
          <Button
            onPress={() => { draftOrder.refetch(); settings.refetch(); }}
            isPending={draftOrder.isRefetching || settings.isRefetching}
            variant="outline"
          >
            Try Again
          </Button>
        </View>
      </Layout>
    );
  }

  if (!draftOrder.data?.items.length) {
    return (
      <Layout className="bg-canvas">
        <Text className="text-4xl text-white">Checkout</Text>
        <View className="flex-1 items-center justify-center gap-2">
          <ShoppingCart size={24} color="#9CA3AF" />
          <Text className="text-xl text-white">Your cart is empty</Text>
          <Text className="text-center text-gray-400">Add items to your cart before checking out.</Text>
        </View>
        <View className="flex-row gap-2">
          <Button variant="outline" className="flex-1 border-gray-600" onPress={() => router.back()}>
            Back to Cart
          </Button>
          <Button className="flex-1" disabled>Pay</Button>
        </View>
      </Layout>
    );
  }

  const promotionItems: (TPromotionItem)[] = (addedPromotions.data?.promotions ?? []).map((p) => ({
    ...p,
    discount_amount:
      draftOrder.data?.items
        .flatMap((item) => item.adjustments?.filter((adj) => adj.promotion_id === p.id))
        .reduce((acc, adj) => acc + (adj?.amount || 0), 0) || 0,
  }));

  return (
    <>
      {/* Two-panel landscape layout */}
      <View className="flex-1 flex-row bg-canvas gap-4 p-4">

        {/* ── Left panel: cart items ── */}
        <View className="flex-1 rounded-2xl bg-panel overflow-hidden">
          <View className="px-5 pt-5 pb-3">
            <Text className="text-2xl font-semibold text-white">Order Items</Text>
          </View>
          <FlashList
            data={draftOrder.data.items}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View className="h-px mx-5 bg-gray-700" />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          />
        </View>

        {/* ── Right panel: invoice + payment ── */}
        <View className="w-[42%] rounded-2xl bg-panel overflow-hidden">
          {paymentState === 'charging' ? (
            <ChargingOverlay amount={formattedTotal} onCancel={handleCancelPayment} />
          ) : paymentState === 'success' ? (
            <SuccessOverlay
              amount={formattedTotal}
              pan={paymentMeta.pan}
              cardName={paymentMeta.cardName}
            />
          ) : paymentState === 'failed' ? (
            <FailedOverlay
              error={paymentError}
              onRetry={handlePay}
              onCancel={handleCancelPayment}
            />
          ) : (
            <View className="flex-1 p-5">
              {/* Customer */}
              <CustomerBadge customer={currentDraftOrder.data?.draft_order.customer ?? undefined} />

              {/* Promotions */}
              <PromotionBadge
                onAddPromotion={(code) => addPromotion.mutate(code)}
                isAddingPromotion={addPromotion.isPending}
              />
              {promotionItems.map((p) => (
                <PromotionItem
                  key={p.id}
                  item={p}
                  onRemove={async (item) => {
                    if (item.code) await removePromotion.mutateAsync(item.code).catch(() => {});
                  }}
                  currencyCode={currencyCode}
                />
              ))}

              {/* Totals */}
              <View className="mt-4 gap-2 border-t border-gray-700 pt-4">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-400">Taxes</Text>
                  <Text className="font-mono text-sm text-gray-400">
                    {(draftOrder.data.tax_total ?? 0).toLocaleString('en-US', {
                      style: 'currency', currency: currencyCode, currencyDisplay: 'narrowSymbol',
                    })}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-400">Subtotal</Text>
                  <Text className="font-mono text-sm text-gray-400">
                    {(draftOrder.data.subtotal ?? 0).toLocaleString('en-US', {
                      style: 'currency', currency: currencyCode, currencyDisplay: 'narrowSymbol',
                    })}
                  </Text>
                </View>
                {typeof draftOrder.data.discount_total === 'number' && draftOrder.data.discount_total > 0 && (
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-400">Discount</Text>
                    <Text className="font-mono text-sm text-green-400">
                      {(draftOrder.data.discount_total * -1).toLocaleString('en-US', {
                        style: 'currency', currency: currencyCode, currencyDisplay: 'narrowSymbol',
                      })}
                    </Text>
                  </View>
                )}
              </View>

              {/* Grand total */}
              <View className="mt-3 flex-row justify-between border-t border-gray-700 pt-3">
                <Text className="text-xl font-semibold text-white">Total</Text>
                <Text className="font-mono text-xl font-bold text-white">{formattedTotal}</Text>
              </View>

              {/* Payment method tiles */}
              <View className="mt-5 flex-row gap-3">
                <Pressable
                  onPress={() => setSelectedMethod('card')}
                  className={`flex-1 items-center justify-center rounded-xl border py-4 gap-1 ${
                    selectedMethod === 'card' ? 'border-lime-400 bg-lime-400/10' : 'border-gray-600'
                  }`}
                >
                  <Text className={selectedMethod === 'card' ? 'text-lime-400 text-2xl' : 'text-gray-400 text-2xl'}>
                    💳
                  </Text>
                  <Text className={`text-sm font-medium ${selectedMethod === 'card' ? 'text-lime-400' : 'text-gray-400'}`}>
                    Card
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelectedMethod('cash')}
                  className={`flex-1 items-center justify-center rounded-xl border py-4 gap-1 ${
                    selectedMethod === 'cash' ? 'border-lime-400 bg-lime-400/10' : 'border-gray-600'
                  }`}
                >
                  <Text className={selectedMethod === 'cash' ? 'text-lime-400 text-2xl' : 'text-gray-400 text-2xl'}>
                    💵
                  </Text>
                  <Text className={`text-sm font-medium ${selectedMethod === 'cash' ? 'text-lime-400' : 'text-gray-400'}`}>
                    Cash
                  </Text>
                </Pressable>
              </View>

              {/* CTA buttons */}
              <View className="mt-4 flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600"
                  onPress={() => router.back()}
                  disabled={!isDraftOrder || completeOrder.isPending}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-lime-400"
                  onPress={handlePay}
                  disabled={!isDraftOrder || completeOrder.isPending}
                  isPending={completeOrder.isPending}
                >
                  Pay {formattedTotal}
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Order confirmed dialog (existing logic) */}
      <Dialog
        visible={!isDraftOrder && pathName === `/checkout/${draftOrderId}`}
        showCloseButton={false}
        dismissOnOverlayPress={false}
        onRequestClose={(event) => event.preventDefault()}
        onOverlayPress={(event) => event.preventDefault()}
        onCloseIconPress={(event) => event.preventDefault()}
        title="Order confirmed!"
        contentClassName="flex-shrink"
      >
        <InfoBanner colorScheme="success" className="mb-4">
          The order has been placed successfully. You can track the order status on Orders screen.
        </InfoBanner>
        <Button
          className="mb-2"
          onPress={() => {
            router.replace('/orders');
            router.push({
              pathname: '/orders/[orderId]',
              params: {
                orderId: draftOrderId,
                orderNumber: draftOrder.data.display_id,
                orderDate: formatDate(draftOrder.data.created_at),
              },
            });
          }}
        >
          View Order
        </Button>
        <Button variant="outline" onPress={() => router.replace('/products')}>
          Back to shop
        </Button>
      </Dialog>
    </>
  );
}
