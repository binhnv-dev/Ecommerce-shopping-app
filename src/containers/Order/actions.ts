import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import axios from 'axios';

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS,
  FETCH_CUSTOMER_ORDERS,
} from './constants';

import {clearCart, getCartId} from '../Cart/actions';
import handleError from '../../utils/error';
import {navigate} from '../../helpers/navigation';
import {showMessage} from 'react-native-flash-message';

type ThunkResult<R> = ThunkAction<R, any, undefined, AnyAction>;

export const updateOrderStatus = (value: any) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: value,
  };
};

export const setOrderLoading = (value: boolean) => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value,
  };
};

export const fetchOrders = (): ThunkResult<void> => {
  return async dispatch => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order`);

      if (response.data.orders) {
        dispatch({
          type: FETCH_ORDERS,
          payload: response.data.orders,
        });
      }
    } catch (error: any) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchCustomerOrders = (): ThunkResult<void> => {
  return async dispatch => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/customer`);
      if (response.data.orders) {
        dispatch({
          type: FETCH_CUSTOMER_ORDERS,
          payload: response.data.orders,
        });
      }
    } catch (error: any) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchSearchOrders = (filter: any): ThunkResult<void> => {
  return async dispatch => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/search`, {
        params: {
          search: filter.value,
        },
      });

      dispatch({type: FETCH_SEARCHED_ORDERS, payload: response.data.orders});
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const searchOrders = (filter: any): ThunkResult<void> => {
  return async dispatch => {
    try {
      dispatch(fetchSearchOrders(filter));
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const fetchOrder = (
  id: string,
  withLoading = true,
): ThunkResult<void> => {
  return async dispatch => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`/api/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};

export const cancelOrder = (): ThunkResult<void> => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`/api/order/cancel/${order._id}`);

      navigate('Orders');
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const updateOrderItemStatus = (
  itemId: string,
  status: string,
): ThunkResult<void> => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      const response = await axios.put(`/api/order/status/item/${itemId}`, {
        orderId: order._id,
        cartId: order.cartId,
        status,
      });

      if (response.data.orderCancelled) {
        navigate('Orders');
      } else {
        dispatch(updateOrderStatus({itemId, status}));
        dispatch(fetchOrder(order._id, false));
      }

      showMessage({message: `${response.data.message}`, type: 'success'});
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const addOrder = (): ThunkResult<void> => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total,
        });
        navigate(`OrderSuccess`, {orderId: response.data.order._id});
        dispatch(clearCart());
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const placeOrder = (): ThunkResult<void> => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const cartItems = getState().cart.cartItems;

    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())])
        .then(() => {
          dispatch(addOrder());
          showMessage({
            message: 'Order placed successfully',
            type: 'success',
          });
        })
        .catch((error: any) => {
          handleError(error, dispatch);
        });
    }
  };
};

export const paidOrderSuccess = (
  order: any,
  data: any,
  type: string,
  amount: number,
  tokenId: string | null = null,
): ThunkResult<void> => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/payment/success', {
        userId: order?.user,
        productId: order.products[0]._id,
        orderId: order._id,
        data,
        provider: type,
        tokenId,
        amount,
      });

      if (response.data) {
        dispatch(fetchOrder(order._id, false));
        showMessage({
          message: `${response.data.message}`,
          type: 'success',
        });
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  };
};
