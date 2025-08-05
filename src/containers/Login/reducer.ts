/*
 *
 * Login reducer
 *
 */

import {
    LOGIN_CHANGE,
    LOGIN_RESET,
    SET_LOGIN_LOADING,
    SET_LOGIN_FORM_ERRORS,
    SET_LOGIN_SUBMITTING
  } from './constants';

  interface LoginFormData {
    email: string;
    password: string;
  }
  
  interface LoginState {
    loginFormData: LoginFormData;
    formErrors: Record<string, string>;
    isSubmitting: boolean;
    isLoading: boolean;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: LoginState = {
    loginFormData: {
      email: '',
      password: ''
    },
    formErrors: {},
    isSubmitting: false,
    isLoading: false
  };
  
  const loginReducer = (state: LoginState = initialState, action: Action): LoginState => {
    switch (action.type) {
      case LOGIN_CHANGE:
        return {
          ...state,
          loginFormData: { ...state.loginFormData, ...action.payload }
        };
      case SET_LOGIN_FORM_ERRORS:
        return {
          ...state,
          formErrors: action.payload
        };
      case SET_LOGIN_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      case SET_LOGIN_SUBMITTING:
        return {
          ...state,
          isSubmitting: action.payload
        };
      case LOGIN_RESET:
        return {
          ...state,
          loginFormData: {
            email: '',
            password: ''
          },
          formErrors: {},
          isLoading: false
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;