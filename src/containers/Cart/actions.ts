import { Dispatch } from 'redux';
import axios from 'axios';

import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART,
} from './constants';

import {
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT_SHOP,
} from '../Product/constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import * as yup from 'yup';
import { navigate } from '../../helpers/navigation';
import { showMessage } from 'react-native-flash-message';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  inventory: number;
  imageUrl: string;
  description: string;
  sku: string;
  brand: {
    name: string;
    slug: string;
  };
  taxable: boolean;
}

const cardSchema = (quantity: number) => {
    return yup.object().shape({
        quantity: yup
        .number()
        .min(1, 'Quantity must be at least 1.')
        .max(quantity, `Quantity may not be greater than ${quantity}.`),
    });
};

// Handle Add To Cart
export const handleAddToCart = (product: Product) => {
  return async (dispatch: Dispatch, getState: any) => {
    product.quantity = Number(getState().product.productShopData.quantity);
    product.totalPrice = product.quantity * product.price;
    product.totalPrice = parseFloat(product.totalPrice.toFixed(2));
    const inventory = getState().product.storeProduct.inventory;

    const result = calculatePurchaseQuantity(inventory);

    const { isValid, errors } = await allFieldsValidation(product, cardSchema(result));

    if (!isValid) {
      return dispatch({ type: SET_PRODUCT_SHOP_FORM_ERRORS, payload: errors });
    }

    dispatch({
      type: RESET_PRODUCT_SHOP,
    });

    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
    dispatch(calculateCartTotal() as any);
    navigate('Cart');
    showMessage({
        message: 'Product added to cart',
        type: 'success',
    })
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = (product: Product) => {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });
    dispatch(calculateCartTotal() as any);
    showMessage({
      message: 'This product has been removed from your cart',
      type: 'success',
    });
  };
};

export const calculateCartTotal = () => {
  return (dispatch: Dispatch, getState: any) => {
    const cartItems = getState().cart.cartItems;

    let total = 0;

    cartItems.map((item: Product) => {
      total += item.price * item.quantity;
    });

    total = parseFloat(total.toFixed(2));

    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total,
    });
  };
};

// set cart store from cookie
export const handleCart = () => {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem('cart_items') || '[]'),
    itemsInCart: JSON.parse(localStorage.getItem('items_in_cart') || '[]'),
    cartTotal: localStorage.getItem('cart_total'),
    cartId: localStorage.getItem('cart_id'),
  };

  return (dispatch: Dispatch, getState: any) => {
    if (cart.cartItems.length > 0 || cart.itemsInCart.length > 0) {
      dispatch({
        type: HANDLE_CART,
        payload: cart,
      });
    }
  };
};

export const handleCheckout = () => {
  return (dispatch: Dispatch, getState: any) => {
    navigate('Login');
    showMessage({
      message: `Please Login to proceed to checkout`,
      type: 'warning',
    });
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch: Dispatch, getState: any) => {
    navigate('Home');
  };
};

// create cart id api
export const getCartId = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const cartItems = getState().cart.cartItems;
      const products = getCartItems(cartItems);

      if (!cartId) {
        const response = await axios.post(`/api/cart/add`, { products });

        dispatch(setCartId(response.data.cartId) as any);
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = (cartId: string) => {
  return (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: SET_CART_ID,
      payload: cartId,
    });
  };
};

export const clearCart = () => {
  return (dispatch: Dispatch, getState: any) => {
    localStorage.removeItem('cart_items');
    localStorage.removeItem('items_in_cart');
    localStorage.removeItem('cart_total');
    localStorage.removeItem('cart_id');

    dispatch({
      type: CLEAR_CART,
    });
  };
};

const getCartItems = (cartItems: Product[]) => {
  const newCartItems = cartItems.map((item) => ({
    quantity: item.quantity,
    price: item.price,
    taxable: item.taxable,
    product: item._id,
  }));

  return newCartItems;
};

const calculatePurchaseQuantity = (inventory: number) => {
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