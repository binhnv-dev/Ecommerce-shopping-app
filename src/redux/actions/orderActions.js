import axios from 'axios';
import { configs } from '../../configs';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MYORDERS_REQUEST,
  ORDER_LIST_MYORDERS_SUCCESS,
  ORDER_LIST_MYORDERS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';
import { clearCart, getCartId } from './cartActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { LOCAL_SERVER_URL } = configs;

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
        cart: { cartItems },
      } = getState();
      const cartId = await AsyncStorage.getItem('cart_id');
      const total = getCartTotal(cartItems);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userInfo.token}`,
        },
      };
      if (cartId) {
        const response = await axios.post(
          `/api/order/add`,
          {
            cartId,
            total,
          },
          config,
        );
        dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const placeOrder = () => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
      cart: { cartItems },
    } = getState();
    const token = userInfo.token;

    if (token && cartItems.length > 0) {
      await Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder());
      });
    }
    dispatch(toggleCart());
  };
};

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${LOCAL_SERVER_URL}/api/order/add`,
      order,
      config,
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch(clearCart());
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_SERVER_URL}/api/order/${id}`,
      config,
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_SERVER_URL}/api/orders/${id}/pay`,
      {},
      config,
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${LOCAL_SERVER_URL}/api/orders/${id}/deliver`,
      {},
      config,
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MYORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${LOCAL_SERVER_URL}/api/order`,
      config,
    );

    dispatch({
      type: ORDER_LIST_MYORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MYORDERS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${LOCAL_SERVER_URL}/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getCartTotal = cartItems => {
  let total = 0;

  cartItems.map(item => {
    total += item.price * item.quantity;
  });

  return parseFloat(total.toFixed(2));
};
