import { Product } from '../Product/reducer';
import {
    FETCH_ORDERS,
    FETCH_SEARCHED_ORDERS,
    FETCH_ORDER,
    UPDATE_ORDER_STATUS,
    SET_ORDERS_LOADING,
    CLEAR_ORDERS,
    FETCH_CUSTOMER_ORDERS,
    PAID_PAYPAL,
  } from './constants';
  

  interface OrderProduct extends Product {
    status: string;
  }
  
  interface Order {
    _id: string;
    cartId: string;
    products: OrderProduct[];
    totalTax: number;
    total: number;
    status: string;
  }
  
  interface OrderState {
    orders: Order[];
    allOrders: Order[];
    searchedOrders: Order[];
    order: Order;
    payment: any;
    isLoading: boolean;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: OrderState = {
    orders: [],
    allOrders: [],
    searchedOrders: [],
    order: {
      _id: '',
      cartId: '',
      products: [],
      totalTax: 0,
      total: 0,
      status: '',
    },
    payment: {},
    isLoading: false,
  };
  
  const orderReducer = (state = initialState, action: Action): OrderState => {
    switch (action.type) {
      case FETCH_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
      case FETCH_CUSTOMER_ORDERS:
        return {
          ...state,
          allOrders: action.payload,
        };
      case FETCH_SEARCHED_ORDERS:
        return {
          ...state,
          searchedOrders: action.payload,
        };
      case FETCH_ORDER:
        return {
          ...state,
          order: action.payload,
        };
      case UPDATE_ORDER_STATUS:
        const itemIndex = state.order.products.findIndex(
          (item) => item._id === action.payload.itemId
        );
  
        const newProducts = [...state.order.products];
        newProducts[itemIndex].status = action.payload.status;
        return {
          ...state,
          order: {
            ...state.order,
            products: newProducts,
          },
        };
      case SET_ORDERS_LOADING:
        return {
          ...state,
          isLoading: action.payload,
        };
      case CLEAR_ORDERS:
        return {
          ...state,
          orders: [],
        };
      case PAID_PAYPAL:
        return {
          ...state,
          payment: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;