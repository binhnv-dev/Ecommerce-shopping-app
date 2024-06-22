import axios from 'axios';
import { configs } from '../../configs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  SET_CART_ID,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants';
import { Alert } from 'react-native';

const { LOCAL_SERVER_URL } = configs;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${LOCAL_SERVER_URL}/api/product/item/${id}`);

    const { product } = data;

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        ...product,
        product: product.slug,
        name: product.name,
        image: product.imageUrl,
        price: product.price,
        countInStock: product.quantity,
        qty,
      },
    });
    await AsyncStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  try {
    await AsyncStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (error) {
    console.log(error);
  }
};

export const saveShippingAddress = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  try {
    await AsyncStorage.setItem('shippingAddress', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const savePaymentMethod = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  try {
    await AsyncStorage.setItem('paymentMethod', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = await AsyncStorage.getItem("cart_id");
      const cartItems = getState().cart.cartItems;
      const products = getCartItems(cartItems);

      if (!cartId) {
        const response = await axios.post(`/api/cart/add`, { products });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = (cartId) => {
  return async (dispatch) => {
    await AsyncStorage.setItem(
      'cart_id',
      cartId,
    );
    dispatch({
      type: SET_CART_ID,
      payload: cartId,
    });
  };
};


export const clearCart = () => {
  return async (dispatch, getState) => {
    await AsyncStorage.removeItem("cart_items");
    await AsyncStorage.removeItem("items_in_cart");
    await AsyncStorage.removeItem("cart_total");
    await AsyncStorage.removeItem("cart_id");

    dispatch({
      type: CART_CLEAR_ITEMS,
    });
  };
};

const getCartItems = (cartItems) => {
  const newCartItems = [];
  cartItems.map((item) => {
    const newItem = {};
    newItem.quantity = item.quantity;
    newItem.price = item.price;
    newItem.taxable = item.taxable;
    newItem.product = item._id;
    newCartItems.push(newItem);
  });

  return newCartItems;
};

const calculatePurchaseQuantity = (inventory) => {
  if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }
};

