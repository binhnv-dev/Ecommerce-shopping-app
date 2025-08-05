import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { showMessage } from 'react-native-flash-message';

import {
  FETCH_WISHLIST,
  SET_WISHLIST_LOADING,
  WISHLIST_CHANGE
} from './constants';
import handleError from '../../utils/error';
import { RootState } from '../../store';
import axiosInstance from '../../services/axios';

interface WishlistForm {
  value: boolean;
  name: string;
  id: string;
}

interface WishlistResponse {
  success: boolean;
  message: string;
  wishlist: any[];
}

export const updateWishlist = (e: any) => {
  return async (dispatch: ThunkDispatch<RootState, void, any>, getState: () => RootState) => {
    try {
      if (getState().authentication.authenticated) {
        const wishlistForm: WishlistForm = {
          value: e.checked,
          name: e.name,
          id: e.id
        };

        dispatch({ type: WISHLIST_CHANGE, payload: wishlistForm });
        const wishlist = getState().wishlist.wishlistForm;

        const newWishlist = {
          isLiked: wishlist.value,
          product: wishlist.id
        };

        const response = await axiosInstance.post<WishlistResponse>(`/api/wishlist`, newWishlist);

        if (response.data.success) {
          showMessage({
            message: response.data.message,
            type: 'success',
            duration: 2000,
            position: 'top'
          });
          dispatch(fetchWishlist());
        }
      } else {
        showMessage({
          message: 'Please login to wishlist a product',
          type: 'warning',
          duration: 2000,
          position: 'top'
        });
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const fetchWishlist = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SET_WISHLIST_LOADING, payload: true });

      const response = await axiosInstance.get<WishlistResponse>(`/api/wishlist`);

      dispatch({ type: FETCH_WISHLIST, payload: response.data.wishlist });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_WISHLIST_LOADING, payload: false });
    }
  };
};