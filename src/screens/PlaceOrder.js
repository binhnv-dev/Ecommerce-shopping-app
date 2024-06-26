import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../utils/constants/colors';

import { PrimaryButton } from '../components/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import PlaceOrderItem from '../components/PlaceOrderItem';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { createOrder, placeOrder } from '../redux/actions/orderActions';
import { updateProductStock } from '../redux/actions/productActions';

const PlaceOrder = ({ navigation }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calc prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 5);
  cart.taxPrice = addDecimals(Number((0.07 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, error } = orderCreate;
  let { success } = orderCreate;

  useEffect(() => {
    if (success) {
      setLoading(false);
      callNavigate(order._id);
    }
    // eslint-disable-next-line
  }, [success]);

  const callNavigate = orderID => {
    if (created) {
      setCreated(false);
      navigation.navigate('Order', orderID);
    }
  };

  const onPress = () => {
    setLoading(true);
    try {
      dispatch(placeOrder());
      setCreated(true);
    } catch (error) {
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };
  const handleNav = nav => {
    navigation.navigate(nav);
  };

  return (
    <SafeAreaView style={style.container}>
      <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      <CheckoutSteps step1 step2 step3 step4 handleNav={handleNav} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
          backgroundColor: COLORS.white,
        }}
        data={cart.cartItems}
        scrollEnabled={true}
        removeClippedSubviews={true}
        onEndReachedThreshold={1}
        scrollEventThrottle={250}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={200}
        initialNumToRender={10}
        snapToAlignment="center"
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <PlaceOrderItem item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <Text style={style.summaryTitle}>Order Summary</Text>
            <View style={style.summary}>
              <Text style={style.summaryText}>Items</Text>
              <Text style={style.summaryText}>${cart.itemsPrice}</Text>
            </View>
            <View style={style.summary}>
              <Text style={style.summaryText}>Shipping</Text>
              <Text style={style.summaryText}>${cart.shippingPrice}</Text>
            </View>
            <View style={style.summary}>
              <Text style={style.summaryText}>Tax</Text>
              <Text style={style.summaryText}>${cart.taxPrice}</Text>
            </View>
            <View style={style.summary}>
              <Text style={style.summaryText}>Total</Text>
              <Text style={style.summaryText}>${cart.totalPrice}</Text>
            </View>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton
                title="Place Order"
                onPress={onPress}
                disabled={cart.cartItems.length === 0}
              />
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <View style={style.shippingAddressContainer}>
              <Text style={style.title}>Shipping Address</Text>
              <Text numberOfLines={2} style={style.para}>
                * {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </Text>
            </View>
            <View style={style.paymentContainer}>
              <Text style={style.title}>Payment Method</Text>
              <Text numberOfLines={1} style={style.para}>
                * {cart.paymentMethod}
              </Text>
            </View>
            <View style={style.paymentContainer}>
              <Text style={style.title}>Your Order Items</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  shippingAddressContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    color: COLORS.dark,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  para: {
    fontSize: 15,
    color: COLORS.dark,
    paddingBottom: 10,
    marginLeft: 5,
  },
  summaryTitle: {
    fontSize: 20,
    color: COLORS.dark,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlaceOrder;
