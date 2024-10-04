/*
 *
 * Account reducer
 *
 */

import {
    ACCOUNT_CHANGE,
    FETCH_PROFILE,
    CLEAR_ACCOUNT,
    SET_PROFILE_LOADING
  } from './constants';
  
  export interface User {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
  }
  
  interface AccountState {
    user: User;
    isLoading: boolean;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: AccountState = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    },
    isLoading: false
  };
  
  const accountReducer = (state: AccountState = initialState, action: Action): AccountState => {
    switch (action.type) {
      case ACCOUNT_CHANGE:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload
          }
        };
      case FETCH_PROFILE:
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload
          }
        };
      case CLEAR_ACCOUNT:
        return {
          ...state,
          user: {
            firstName: '',
            lastName: ''
          }
        };
      case SET_PROFILE_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      default:
        return state;
    }
  };
  
  export default accountReducer;