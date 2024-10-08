/*
 *
 * Cart reducer
 *
 */

import {
    HANDLE_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    HANDLE_CART_TOTAL,
    SET_CART_ID,
    CLEAR_CART
  } from './constants';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
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
  }
  
  interface CartState {
    cartItems: Product[];
    itemsInCart: string[];
    cartTotal: number;
    cartId: string;
  }
  
  const initialState: CartState = {
    cartItems: [],
    itemsInCart: [],
    cartTotal: 0,
    cartId: ''
  };
  
  const cartReducer = (
    state = initialState,
    action: any
  ): CartState => {
    let newState: CartState;
  
    switch (action.type) {
      case ADD_TO_CART:
        newState = {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          itemsInCart: [...state.itemsInCart, action.payload._id]
        };
  
        AsyncStorage.setItem('cart_items', JSON.stringify(newState.cartItems));
        AsyncStorage.setItem(
          'items_in_cart',
          JSON.stringify(newState.itemsInCart)
        );
        return newState;
      case REMOVE_FROM_CART:
        const itemIndex = state.cartItems.findIndex(
          x => x._id === action.payload._id
        );
        newState = {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, itemIndex),
            ...state.cartItems.slice(itemIndex + 1)
          ],
          itemsInCart: [
            ...state.itemsInCart.slice(0, itemIndex),
            ...state.itemsInCart.slice(itemIndex + 1)
          ]
        };
  
        AsyncStorage.setItem('cart_items', JSON.stringify(newState.cartItems));
        AsyncStorage.setItem(
          'items_in_cart',
          JSON.stringify(newState.itemsInCart)
        );
        return newState;
      case HANDLE_CART_TOTAL:
        newState = {
          ...state,
          cartTotal: action.payload
        };
  
        AsyncStorage.setItem('cart_total', newState.cartTotal.toString());
        return newState;
      case HANDLE_CART:
        newState = {
          ...state,
          cartItems: action.payload.cartItems,
          itemsInCart: action.payload.itemsInCart,
          cartTotal: action.payload.cartTotal,
          cartId: action.payload.cartId
        };
        return newState;
      case SET_CART_ID:
        newState = {
          ...state,
          cartId: action.payload
        };
        AsyncStorage.setItem('cart_id', newState.cartId);
        return newState;
      case CLEAR_CART:
        newState = {
          ...state,
          cartItems: [],
          itemsInCart: [],
          cartTotal: 0,
          cartId: ''
        };
        AsyncStorage.removeItem('cart_items');
        AsyncStorage.removeItem('items_in_cart');
        AsyncStorage.removeItem('cart_total');
        AsyncStorage.removeItem('cart_id');
        return newState;
  
      default:
        return state;
    }
  };
  
  export default cartReducer;