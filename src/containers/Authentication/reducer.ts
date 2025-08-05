/*
 *
 * Authentication reducer
 *
 */

import { SET_AUTH, CLEAR_AUTH } from './constants';

interface AuthenticationState {
  authenticated: boolean;
  isLoading: boolean;
}

interface Action {
  type: string;
}

const initialState: AuthenticationState = {
  authenticated: false,
  isLoading: false
};

const authenticationReducer = (state: AuthenticationState = initialState, action: Action): AuthenticationState => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authenticated: true
      };
    case CLEAR_AUTH:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
};

export default authenticationReducer;