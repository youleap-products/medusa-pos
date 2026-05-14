import {
  useCancelDraftOrder,
  useCurrentDraftOrder,
  useUpdateDraftOrderItem,
} from '@/api/hooks/draft-orders';
import { ShoppingCart } from '@/components/icons/shopping-cart';
import { Trash2 } from '@/components/icons/trash-2';
import { InfoBanner } from '@/components/InfoBanner';
import { CartSkeleton } from '@/components/skeletons/CartSkeleton';
import { SwipeableListItem } from '@/components/SwipeableListItem';
import { Button } from '@/components/ui/Button';
import { Layout } from '@/components/ui/Layout';
import { Prompt } from '@/components/ui/Prompt';
import { QuantityPicker } from '@/components/ui/QuantityPicker';
import { Text } from '@/components/ui/Text';
import { useSettings } from '@/contexts/settings';
import { AdminOrderLineItem } from '@medusajs/types';
import type { FlashListRef } from '@shopify/flash-list';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useIsMutating } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { SequencedTransition, SlideOutLeft } from 'react-native-reanimated';

const ItemCell = React.forwardRef<Animated.View>((props, ref) => (
  <Animated.View {...props} layout={SequencedTransition} exiting={SlideOutLeft} ref={ref} />
));
ItemCell.displayName = 'ItemCell';

const ItemSeparatorComponent = React.forwardRef<Animated.View>((props, ref) => (
  <Animated.View className="h-hairline bg-gray-200" ref={ref} />
));
ItemSeparatorComponent.displayName = 'ItemSeparatorComponent';

const DraftOrderItem: React.FC<{ item: AdminOrderLineItem; onRemove?: (item: AdminOrderLineItem) => void }> = ({
  item,
  onRemove,
}) => {
  const settings = useSettings();
  const draftOrder = useCurrentDraftOrder();
  const updateDraftOrderItem = useUpdateDraftOrderItem();
  const thumbnail = item.thumbnail || item.product?.thumbnail || item.product?.images?.[0]?.url;

  return (
    <SwipeableListItem
      rightClassName="bg-white"
      rightWidth={80}
      rightContent={
        <View className="h-full w-full flex-1 items-center justify-center p-2">
          <Pressable
            className="h-full w-full flex-1 items-center justify-center rounded-xl bg-error-500"
            onPress={() => onRemove?.(item)}
          >
            <Trash2 size={24} color="white" />
          </Pressable>
        </View>
      }
    >
      <View className="flex-row gap-4 bg-white py-6">
        <View className="h-[5.25rem] w-[5.25rem] overflow-hidden rounded-xl bg-gray-200">
          {thumbnail && <Image source={{ uri: thumbnail }} className="h-full w-full object-cover" />}
        </View>
        <View className="flex-1 flex-col gap-2">
          <Text>{item.product_title}</Text>
          {item.variant?.options && item.variant.options.length > 0 && (
            <View className="flex-row flex-wrap items-center gap-x-2 gap-y-1">
              {item.variant.options.map((option) => (
                <View className="flex-row gap-1" key={option.id}>
                  <Text className="text-sm text-gray-400">{option.option?.title || option.option_id}:</Text>
                  <Text className="text-sm">{option.value}</Text>
                </View>
              ))}
            </View>
          )}
          <QuantityPicker
            quantity={item.quantity}
            max={item.variant?.inventory_quantity}
            onQuantityChange={(quantity) =>
              updateDraftOrderItem.mutate({ id: item.id, update: { quantity } })
            }
            className="self-start"
          />
        </View>
        <Text className="ml-auto">
          {item.unit_price.toLocaleString('en-US', {
            style: 'currency',
            currency: draftOrder.data?.draft_order.region?.currency_code || settings.data?.region?.currency_code,
            currencyDisplay: 'narrowSymbol',
          })}
        </Text>
      </View>
    </SwipeableListItem>
  );
};

export default function CartScreen() {
  const settings = useSettings();
  const draftOrder = useCurrentDraftOrder();
  const cancelDraftOrder = useCancelDraftOrder();
  const updateDraftOrderItem = useUpdateDraftOrderItem();
  const isUpdatingDraftOrder = useIsMutating({ mutationKey: ['draft-order'], exact: false });
  const itemsListRef = React.useRef<FlashListRef<AdminOrderLineItem>>(null);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const onItemRemove = React.useCallback(
    (item: AdminOrderLineItem) => {
      updateDraftOrderItem.mutate({ id: item.id, update: { quantity: 0 } });
      itemsListRef.current?.prepareForLayoutAnimationRender();
    },
    [updateDraftOrderItem],
  );

  const renderItem = React.useCallback<ListRenderItem<AdminOrderLineItem>>(
    ({ item }) => <DraftOrderItem item={item} onRemove={onItemRemove} />,
    [onItemRemove],
  );

  const keyExtractor = React.useCallback((item: AdminOrderLineItem) => item.id, []);

  if (draftOrder.isLoading || settings.isLoading) return <CartSkeleton />;

  if (draftOrder.isError || settings.isError) {
    return (
      <Layout className="pb-6">
        <Text className="text-4xl">Cart</Text>
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

  if (!draftOrder.data?.draft_order?.items.length) {
    return (
      <Layout className="pb-6">
        <Text className="text-4xl">Cart</Text>
        <View className="flex-1 items-center justify-center gap-1">
          <ShoppingCart size={24} />
          <Text className="text-xl">Your cart is empty</Text>
          <Text className="text-gray-300">Add products to begin</Text>
        </View>
        <View className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => cancelDraftOrder.mutate()}
            isPending={cancelDraftOrder.isPending}
            disabled={!draftOrder.data?.draft_order}
          >
            Cancel Cart
          </Button>
          <Button className="flex-1" disabled>Checkout</Button>
        </View>
      </Layout>
    );
  }

  const currencyCode =
    draftOrder.data.draft_order.region?.currency_code || settings.data?.region?.currency_code;

  return (
    <>
      <Layout className="pb-6">
        <Text className="mb-6 text-4xl">Cart</Text>
        <FlashList
          ref={itemsListRef}
          data={draftOrder.data.draft_order.items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          CellRendererComponent={ItemCell}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        />
        <View>
          <View className="mb-4 h-hairline bg-gray-200" />
          <View className="mb-6 flex-row justify-between">
            <Text className="text-lg">Total</Text>
            {draftOrder.isFetching || isUpdatingDraftOrder > 0 ? (
              <View className="h-7 w-1/4 rounded-md bg-gray-200" />
            ) : (
              <Text className="text-lg">
                {draftOrder.data.draft_order.total?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: currencyCode,
                  currencyDisplay: 'narrowSymbol',
                })}
              </Text>
            )}
          </View>
          <View className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => setIsDialogVisible(true)}
              isPending={cancelDraftOrder.isPending}
              disabled={draftOrder.isFetching || isUpdatingDraftOrder > 0}
            >
              Cancel Cart
            </Button>
            <Button
              className="flex-1"
              disabled={!draftOrder.data.draft_order.items.length || draftOrder.isFetching || isUpdatingDraftOrder > 0}
              onPress={() => {
                if (!draftOrder.data?.draft_order.id) return;
                router.push(`/checkout/${draftOrder.data.draft_order.id}`);
              }}
            >
              Checkout
            </Button>
          </View>
        </View>
      </Layout>

      <Prompt
        onSubmit={() => cancelDraftOrder.mutate(undefined, { onSettled: () => setIsDialogVisible(false) })}
        onClose={() => setIsDialogVisible(false)}
        title="Are you sure you want to cancel the cart?"
        visible={isDialogVisible}
        showCloseButton={false}
        dismissOnOverlayPress={false}
      />
    </>
  );
}
