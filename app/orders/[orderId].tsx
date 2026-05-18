import { DRAFT_ORDER_DEFAULT_CUSTOMER_EMAIL } from '@/api/hooks/draft-orders';
import { useFulfillOrder, useOrder, useRefundOrder } from '@/api/hooks/orders';
import { InfoBanner } from '@/components/InfoBanner';
import { LoadingBanner } from '@/components/LoadingBanner';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { FulfillmentStatus, OrderStatus, PaymentStatus } from '@/components/ui/OrderStatus';
import { Text } from '@/components/ui/Text';
import { useSettings } from '@/contexts/settings';
import { AdminOrder, AdminOrderLineItem } from '@medusajs/types';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

const CustomerInformation: React.FC<{
  order: AdminOrder;
}> = ({ order }) => {
  const customerEmail = order.customer?.email;
  const customerName = [order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ');
  const customerPhone = order.customer?.phone;
  const customerAddress = order.shipping_address
    ? [
        order.shipping_address.address_1,
        order.shipping_address.address_2,
        [order.shipping_address.postal_code, order.shipping_address.city].filter(Boolean).join(' '),
        order.shipping_address.province,
        order.shipping_address.country?.display_name,
      ]
        .filter(Boolean)
        .join(', ')
    : undefined;
  const isPosDefaultCustomer = !customerEmail || customerEmail === DRAFT_ORDER_DEFAULT_CUSTOMER_EMAIL;

  if (isPosDefaultCustomer) {
    return (
      <View className="mb-4 gap-4">
        <Text className="text-xl">Customer</Text>
        <View>
          <Text className="text-sm text-gray-300">
            No customer information available. This order was created on POS without a customer.
          </Text>
        </View>
      </View>
    );
  }

  const info = [
    { label: 'Full Name', value: customerName },
    { label: 'Mail', value: customerEmail },
    { label: 'Address', value: customerAddress },
    { label: 'Phone', value: customerPhone },
  ].filter((item) => item.value && item.value.trim().length > 0);

  return (
    <View className="mb-4 gap-4">
      <Text className="text-xl">Customer</Text>
      {info.map((item, index) => (
        <View key={item.label}>
          <View className="flex-row items-center justify-between gap-4">
            <View className="flex-1">
              <Text className="max-w-32 text-sm text-gray-300">{item.label}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-right text-sm">{item.value}</Text>
            </View>
          </View>
          {index < info.length - 1 && <View className="mt-2 h-hairline w-full bg-gray-200" />}
        </View>
      ))}
    </View>
  );
};

type RefundState = 'idle' | 'confirm' | 'processing' | 'success' | 'error';

const RefundSection: React.FC<{ order: AdminOrder; currency: string }> = ({ order, currency }) => {
  const [refundState, setRefundState] = React.useState<RefundState>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const refundOrder = useRefundOrder();

  const paidAmount = order.payment_collections?.reduce(
    (acc, col) => acc + (col.captured_amount ?? 0) - (col.refunded_amount ?? 0),
    0,
  ) ?? 0;

  console.log('[RefundSection]', JSON.stringify({
    payment_status: order.payment_status,
    paidAmount,
    caspit_uid: order.metadata?.caspit_uid,
    collections: order.payment_collections?.map((c) => ({
      id: c.id,
      status: c.status,
      captured_amount: c.captured_amount,
      refunded_amount: c.refunded_amount,
    })),
  }));

  // Only show refund button if there's something to refund
  const isRefundable = paidAmount > 0 && order.payment_status !== 'refunded';
  console.log('[RefundSection] isRefundable=', isRefundable);
  // TEMP: always render to debug visibility
  // if (!isRefundable) return null;

  const hasUid = !!order.metadata?.caspit_uid;
  const actionLabel = hasUid ? 'Cancel Transaction' : 'Refund';
  const actionDescription = hasUid
    ? 'This will cancel the terminal transaction. No card needed.'
    : 'The customer must tap their card on the terminal to complete the refund.';

  const handleConfirm = () => {
    setRefundState('processing');
    refundOrder.mutate(
      { order, amount: paidAmount },
      {
        onSuccess: () => setRefundState('success'),
        onError: (err) => {
          setErrorMessage(err.message ?? 'Refund failed');
          setRefundState('error');
        },
      },
    );
  };

  return (
    <>
      <View className="mt-4">
        <Button
          variant="outline"
          onPress={() => setRefundState('confirm')}
          textClassName="text-red-500"
        >
          {actionLabel}
        </Button>
      </View>

      {/* Confirm dialog */}
      <Dialog
        visible={refundState === 'confirm'}
        title={actionLabel}
        onClose={() => setRefundState('idle')}
        dismissOnOverlayPress={false}
      >
        <View className="gap-4">
          <Text className="text-sm text-gray-300">{actionDescription}</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-gray-300">Amount</Text>
            <Text className="text-lg">
              {paidAmount.toLocaleString('en-US', {
                style: 'currency',
                currency,
                currencyDisplay: 'narrowSymbol',
              })}
            </Text>
          </View>
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onPress={() => setRefundState('idle')}>
              Cancel
            </Button>
            <Button className="flex-1" onPress={handleConfirm}>
              Confirm
            </Button>
          </View>
        </View>
      </Dialog>

      {/* Processing — blocks UI while terminal is active */}
      <Dialog
        visible={refundState === 'processing'}
        title={hasUid ? 'Cancelling...' : 'Waiting for card...'}
        showCloseButton={false}
        dismissOnOverlayPress={false}
      >
        <View className="items-center gap-4 py-4">
          <LoadingBanner variant="ghost">
            {hasUid ? 'Communicating with terminal' : 'Ask customer to tap card on terminal'}
          </LoadingBanner>
        </View>
      </Dialog>

      {/* Success */}
      <Dialog
        visible={refundState === 'success'}
        title="Done"
        onClose={() => setRefundState('idle')}
      >
        <View className="gap-4">
          <InfoBanner colorScheme="success">
            {hasUid ? 'Transaction cancelled successfully.' : 'Refund processed successfully.'}
          </InfoBanner>
          <Button onPress={() => setRefundState('idle')}>Close</Button>
        </View>
      </Dialog>

      {/* Error */}
      <Dialog
        visible={refundState === 'error'}
        title="Refund Failed"
        onClose={() => setRefundState('idle')}
      >
        <View className="gap-4">
          <InfoBanner colorScheme="error">{errorMessage}</InfoBanner>
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onPress={() => setRefundState('idle')}>
              Close
            </Button>
            <Button className="flex-1" onPress={() => setRefundState('confirm')}>
              Try Again
            </Button>
          </View>
        </View>
      </Dialog>
    </>
  );
};

type FulfillState = 'idle' | 'confirm' | 'processing' | 'success' | 'error';

const FulfillmentSection: React.FC<{ order: AdminOrder }> = ({ order }) => {
  const [state, setState] = React.useState<FulfillState>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const fulfillOrder = useFulfillOrder();

  const unfulfilledQty =
    order.items?.reduce((acc, item) => acc + item.quantity - (item.detail?.fulfilled_quantity ?? 0), 0) ?? 0;

  if (unfulfilledQty === 0) return null;

  const handleConfirm = () => {
    setState('processing');
    fulfillOrder.mutate(
      { order },
      {
        onSuccess: () => setState('success'),
        onError: (err) => {
          setErrorMessage(err.message ?? 'Fulfillment failed');
          setState('error');
        },
      },
    );
  };

  return (
    <>
      <View className="mt-4">
        <Button onPress={() => setState('confirm')}>Mark as Fulfilled</Button>
      </View>

      <Dialog
        visible={state === 'confirm'}
        title="Fulfill Order"
        onClose={() => setState('idle')}
        dismissOnOverlayPress={false}
      >
        <View className="gap-4">
          <Text className="text-sm text-gray-300">
            This will mark all {unfulfilledQty} item{unfulfilledQty !== 1 ? 's' : ''} as fulfilled and shipped. The
            customer is taking the items now.
          </Text>
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onPress={() => setState('idle')}>
              Cancel
            </Button>
            <Button className="flex-1" onPress={handleConfirm}>
              Confirm
            </Button>
          </View>
        </View>
      </Dialog>

      <Dialog
        visible={state === 'processing'}
        title="Processing..."
        showCloseButton={false}
        dismissOnOverlayPress={false}
      >
        <View className="items-center gap-4 py-4">
          <LoadingBanner variant="ghost">Creating fulfillment...</LoadingBanner>
        </View>
      </Dialog>

      <Dialog visible={state === 'success'} title="Fulfilled" onClose={() => setState('idle')}>
        <View className="gap-4">
          <InfoBanner colorScheme="success">Order fulfilled and shipped successfully.</InfoBanner>
          <Button onPress={() => setState('idle')}>Close</Button>
        </View>
      </Dialog>

      <Dialog visible={state === 'error'} title="Fulfillment Failed" onClose={() => setState('idle')}>
        <View className="gap-4">
          <InfoBanner colorScheme="error">{errorMessage}</InfoBanner>
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1" onPress={() => setState('idle')}>
              Close
            </Button>
            <Button className="flex-1" onPress={() => setState('confirm')}>
              Try Again
            </Button>
          </View>
        </View>
      </Dialog>
    </>
  );
};

const OrderInformation: React.FC<{
  order: AdminOrder;
  currency: string;
}> = ({ order, currency }) => {
  console.log('[OrderInformation] rendered, order.id=', order.id);
  const automaticTaxesOn = !!order.region?.automatic_taxes;
  const shippingTotal = automaticTaxesOn ? order.shipping_total : order.shipping_subtotal;

  return (
    <>
      <Text className="mb-4 text-xl">Order Details</Text>
      <View className="mb-6 gap-2">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Order Status</Text>
          </View>
          <OrderStatus order={order} />
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Payment Status</Text>
          </View>
          <PaymentStatus order={order} />
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Fulfillment Status</Text>
          </View>
          <FulfillmentStatus order={order} />
        </View>
      </View>
      <CustomerInformation order={order} />
      <Text className="mb-4 text-xl">Summary</Text>
      <View className="gap-2">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">{automaticTaxesOn ? 'Subtotal (incl. taxes)' : 'Subtotal'}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-sm">
              {order.item_total.toLocaleString('en-US', {
                style: 'currency',
                currency,
                currencyDisplay: 'narrowSymbol',
              })}
            </Text>
          </View>
        </View>
        {shippingTotal > 0 && (
          <View className="flex-row items-center justify-between gap-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-300">{automaticTaxesOn ? 'Shipping (incl. taxes)' : 'Shipping'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-right text-sm">
                {shippingTotal.toLocaleString('en-US', {
                  style: 'currency',
                  currency,
                  currencyDisplay: 'narrowSymbol',
                })}
              </Text>
            </View>
          </View>
        )}
        {order.discount_total > 0 && (
          <View className="flex-row items-center justify-between gap-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-300">Discount</Text>
            </View>
            <View className="flex-1">
              <Text className="text-right text-sm">
                {(order.discount_total * -1).toLocaleString('en-US', {
                  style: 'currency',
                  currency,
                  currencyDisplay: 'narrowSymbol',
                })}
              </Text>
            </View>
          </View>
        )}
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Tax Total{automaticTaxesOn ? ' (included)' : ''}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-sm">
              {order.tax_total.toLocaleString('en-US', {
                style: 'currency',
                currency,
                currencyDisplay: 'narrowSymbol',
              })}
            </Text>
          </View>
        </View>
        <View className="h-hairline w-full bg-gray-200" />
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Paid Total</Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-sm">
              {order.payment_collections
                .reduce(
                  (acc, collection) => acc + (collection.captured_amount ?? 0) - (collection.refunded_amount ?? 0),
                  0,
                )
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency,
                  currencyDisplay: 'narrowSymbol',
                })}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Credit Lines Total</Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-sm">
              {(order.credit_lines ?? [])
                .reduce((acc, collection) => acc + ((collection.amount as unknown as number) ?? 0), 0)
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency,
                  currencyDisplay: 'narrowSymbol',
                })}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="text-sm text-gray-300">Outstanding Amount</Text>
          </View>
          <View className="flex-1">
            <Text className="text-right text-sm">
              {(order.summary.pending_difference ?? 0).toLocaleString('en-US', {
                style: 'currency',
                currency,
                currencyDisplay: 'narrowSymbol',
              })}
            </Text>
          </View>
        </View>
      </View>
      <View className="my-4 h-hairline w-full bg-gray-200" />
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <Text className="text-lg">Total</Text>
        </View>
        <View className="flex-1">
          <Text className="text-right text-lg">
            {order.total.toLocaleString('en-US', {
              style: 'currency',
              currency,
              currencyDisplay: 'narrowSymbol',
            })}
          </Text>
        </View>
      </View>
      <FulfillmentSection order={order} />
      <RefundSection order={order} currency={currency} />
    </>
  );
};

const OrderDetails: React.FC<{ animateOut: (callback?: () => void) => void }> = ({ animateOut }) => {
  const { orderId, orderNumber, orderDate } = useLocalSearchParams<{
    orderId: string;
    orderNumber: string;
    orderDate: string;
  }>();

  const settings = useSettings();
  const orderQuery = useOrder(orderId);

  const currency =
    orderQuery.data?.order.currency_code ||
    orderQuery.data?.order.region?.currency_code ||
    settings.data?.region?.currency_code ||
    'EUR';

  const handleProductPress = React.useCallback(
    (product: AdminOrderLineItem) => {
      animateOut(() => {
        router.push({
          pathname: '/product-details',
          params: {
            productId: product.product_id,
            productName: product.product_title,
          },
        });
      });
    },
    [animateOut],
  );

  const renderItem = React.useCallback(
    ({ item }: { item: AdminOrderLineItem }) => {
      const thumbnail = item.thumbnail || item.product?.thumbnail || item.product?.images?.[0]?.url;
      return (
        <TouchableOpacity className="flex-row gap-4" onPress={() => handleProductPress(item)}>
          <View className="aspect-square h-16 overflow-hidden rounded-lg bg-gray-300">
            {thumbnail && <Image source={{ uri: thumbnail }} className="h-full w-full object-cover" />}
          </View>
          <View>
            <Text>{item.title}</Text>
            <Text className="mt-auto text-sm text-gray-300">
              {item.variant?.options?.map((o) => o.value).join(', ')}
            </Text>
          </View>
          <View className="ml-auto">
            <Text>
              {item.total.toLocaleString('en-US', {
                style: 'currency',
                currency,
                currencyDisplay: 'narrowSymbol',
              })}
            </Text>
            <Text className="mt-auto text-right text-sm text-gray-300">
              Qty: {item.quantity.toLocaleString('en-US')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [currency, handleProductPress],
  );

  return (
    <>
      <View className="mb-4 flex-row items-center justify-between gap-4">
        <Text className="text-2xl">Order #{orderNumber}</Text>
        <Text className="text-gray-300">{orderDate}</Text>
      </View>
      {orderQuery.isLoading || settings.isLoading ? (
        <LoadingBanner variant="ghost" className="my-11">
          Fetching order details...
        </LoadingBanner>
      ) : orderQuery.isError ? (
        <View className="py-11">
          <InfoBanner colorScheme="error">
            {orderQuery.error.message || 'An unknown error occurred while fetching the order details.'}
          </InfoBanner>
        </View>
      ) : settings.isError ? (
        <View className="py-11">
          <InfoBanner colorScheme="error">
            {settings.error.message || 'An unknown error occurred while fetching the settings.'}
          </InfoBanner>
        </View>
      ) : orderQuery.isSuccess && orderQuery.data ? (
        <FlatList
          data={orderQuery.data.order.items}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View className="my-6 h-hairline w-full bg-gray-200" />}
          className="shrink grow-0"
          contentContainerClassName="pt-4 grow-0 pb-safe-offset-6"
          ListFooterComponentClassName="mt-14"
          ListFooterComponent={<OrderInformation order={orderQuery.data.order} currency={currency} />}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        />
      ) : (
        <View className="py-11">
          <InfoBanner colorScheme="error">An unknown error occurred while fetching the order details.</InfoBanner>
        </View>
      )}
    </>
  );
};

export default function OrderDetailsScreen() {
  const [visible, setVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(false);

      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []),
  );

  const renderContent = React.useCallback(({ animateOut }: { animateOut: (callback?: () => void) => void }) => {
    return <OrderDetails animateOut={animateOut} />;
  }, []);

  return (
    <BottomSheet visible={visible} onClose={() => router.back()} showCloseButton={false} dismissOnOverlayPress>
      {renderContent}
    </BottomSheet>
  );
}
