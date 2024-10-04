/*
 *
 * ForgotPassword reducer
 *
 */

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS,
  SET_FORGOT_PASSWORD_LOADING,
} from './constants';

interface ForgotPasswordState {
  isLoading: boolean;
  forgotFormData: {
    email: string;
  };
  formErrors: Record<string, string>;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: ForgotPasswordState = {
  isLoading: false,
  forgotFormData: {
    email: '',
  },
  formErrors: {},
};

const forgotPasswordReducer = (
  state = initialState,
  action: Action,
): ForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_CHANGE:
      return {
        ...state,
        forgotFormData: {
          email: action.payload,
        },
      };
    case SET_FORGOT_PASSWORD_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotFormData: {
          email: '',
        },
      };
    case SET_FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
