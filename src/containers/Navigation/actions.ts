/*
 *
 * Navigation actions
 *
 */

import { Dispatch } from 'redux';
import handleError from '../../utils/error';
import {
  TOGGLE_MENU,
  TOGGLE_CART,
  TOGGLE_BRAND,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST
} from './constants';
import axiosInstance from '../../services/axios';

// Action Types
interface ToggleMenuAction {
  type: typeof TOGGLE_MENU;
}

interface ToggleCartAction {
  type: typeof TOGGLE_CART;
}

interface ToggleBrandAction {
  type: typeof TOGGLE_BRAND;
}

interface SearchChangeAction {
  type: typeof SEARCH_CHANGE;
  payload: string;
}

interface SuggestionsFetchRequestAction {
  type: typeof SUGGESTIONS_FETCH_REQUEST;
  payload: any[];
}

interface SuggestionsClearRequestAction {
  type: typeof SUGGESTIONS_CLEAR_REQUEST;
  payload: any[];
}

export type NavigationActionTypes =
  | ToggleMenuAction
  | ToggleCartAction
  | ToggleBrandAction
  | SearchChangeAction
  | SuggestionsFetchRequestAction
  | SuggestionsClearRequestAction;

// Action Creators
export const toggleMenu = (): ToggleMenuAction => {
  return {
    type: TOGGLE_MENU
  };
};

export const toggleCart = (): ToggleCartAction => {
  return {
    type: TOGGLE_CART
  };
};

export const toggleBrand = (): ToggleBrandAction => {
  return {
    type: TOGGLE_BRAND
  };
};

export const onSearch = (v: string): SearchChangeAction => {
  return {
    type: SEARCH_CHANGE,
    payload: v
  };
};

export const onSuggestionsFetchRequested = (value: { value: string }) => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch: Dispatch, getState: any) => {
    try {
      if (inputValue && inputValue.length % 3 === 0) {
        const response = await axiosInstance.get(
          `/api/product/list/search/${inputValue}`
        );
        dispatch({
          type: SUGGESTIONS_FETCH_REQUEST,
          payload: response.data.products
        });
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const onSuggestionsClearRequested = (): SuggestionsClearRequestAction => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: []
  };
};