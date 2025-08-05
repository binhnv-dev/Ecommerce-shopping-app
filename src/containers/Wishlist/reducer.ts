import {
  FETCH_WISHLIST,
  SET_WISHLIST_LOADING,
  WISHLIST_CHANGE,
} from './constants';

interface WishlistState {
  wishlist: any[];
  isLoading: boolean;
  wishlistForm: {
    value?: boolean;
    name?: string;
    id?: string;
  };
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: WishlistState = {
  wishlist: [],
  isLoading: false,
  wishlistForm: {},
};

const wishListReducer = (
  state = initialState,
  action: Action,
): WishlistState => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case SET_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case WISHLIST_CHANGE:
      return {
        ...state,
        wishlistForm: {
          ...state.wishlistForm,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default wishListReducer;
