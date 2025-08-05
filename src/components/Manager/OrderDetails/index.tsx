import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Button, Text} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';
import config from '../../../configs/index';
import {showMessage} from 'react-native-flash-message';
import axiosInstance from '../../../services/axios';

interface OrderDetailsProps {
  order: any;
  user: any;
  cancelOrder: () => void;
  updateOrderItemStatus: (itemId: string, status: string) => void;
  paidOrderSuccess: (
    order: any,
    data: any,
    type: string,
    amount: number,
    tokenId?: string | null,
  ) => void;
  onBack: () => void;
  authentication: boolean;
  paidOrderMobileSuccess: (order: any, type: string, amount: number) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  user,
  authentication,
  cancelOrder,
  updateOrderItemStatus,
  paidOrderSuccess,
  onBack,
  paidOrderMobileSuccess,
}) => {
  const {
    stripe: {apiKey},
  } = config;
  const [stripeToken, setStripeToken] = useState<any>(null);

  const onToken = (token: any) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = () => {
      paidOrderSuccess(
        order,
        stripeToken,
        'Credit',
        order.total,
        stripeToken.id,
      );
    };
    if (stripeToken) {
      makeRequest();
    }
  }, [stripeToken, order.total]);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const fetchPaymentSheetParams = async () => {
    const response = await axiosInstance.post(
      '/api/payment/create-payment-intent',
      {
        amount: order.total * 100,
        currency: 'usd',
      },
    );
    const {paymentIntent, ephemeralKey, customer} = response.data;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
      merchantDisplayName: 'Industrious',
    });

    if (!error) {
      openPaymentSheet();
    } else {
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
    } else {
      paidOrderMobileSuccess(order, 'Credit', order.total);
      showMessage({
        message: 'Payment was processed successfully!',
        type: 'success',
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {authentication ? (
        <>
          <View style={styles.row}>
            <OrderMeta
              order={order}
              cancelOrder={cancelOrder}
              onBack={onBack}
            />
          </View>
          <View style={[styles.row]}>
            <View style={styles.col8}>
              {order.isPaid && (
                <View style={{marginBottom: 16}}>
                  <Text
                    style={{textAlign: 'center', fontSize: 18, color: 'green'}}>
                    Order is Paid!
                  </Text>
                </View>
              )}
              <OrderItems
                order={order}
                user={user}
                updateOrderItemStatus={updateOrderItemStatus}
              />
            </View>

            <View style={[styles.col4]}>
              <OrderSummary order={order} />
              {user?._id === order?.user && !order.isPaid && (
                <View>
                  <StripeProvider publishableKey={apiKey}>
                    <ScrollView>
                      <View style={styles.container}>
                        <View style={styles.row}>
                          <View style={styles.col8}>
                            <Button
                              title="Checkout With Credit Card"
                              onPress={initializePaymentSheet}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </StripeProvider>
                </View>
              )}
            </View>
          </View>
        </>
      ) : (
        <View>
          <Text>You need to be Sign In to view the orders.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 2,
  },
  col8: {
    flex: 2,
  },
  col4: {
    flex: 1,
  },
});

export default OrderDetails;
