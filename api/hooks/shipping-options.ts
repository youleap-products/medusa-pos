import { useMedusaSdk } from '@/contexts/auth';
import { useQuery } from '@tanstack/react-query';

/**
 * Lists shipping options available at the given stock location.
 *
 * In a POS flow the cashier rarely cares about shipping (the customer takes
 * items in-store) but Medusa's createFulfillment workflow reads
 * `shipping_method.provider_id` to pick a fulfillment provider — so we always
 * attach one to the draft order before converting. Most setups will have a
 * single "Pickup" / "Manual" option here.
 */
export const useShippingOptions = (stockLocationId?: string) => {
  const sdk = useMedusaSdk();

  return useQuery({
    queryKey: ['shipping-options', stockLocationId],
    enabled: !!stockLocationId,
    queryFn: async () => {
      const { shipping_options } = await sdk.admin.shippingOption.list({
        stock_location_id: stockLocationId!,
      });
      return shipping_options ?? [];
    },
  });
};
