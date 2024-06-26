import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ITEM_RESET
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: null },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existsItem = state.cartItems.find(x => x.product === item.product)

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existsItem.product ? item : x
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_ITEM_RESET: {
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: null
      }
    }
    case SET_CART_ID:
      newState = {
        ...state,
        cartId: action.payload
      };
      return newState;

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        shippingAddress: {},
        paymentMethod: null,
        cartId: null
      }
    default:
      return state
  }
}
