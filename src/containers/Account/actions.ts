/*
 *
 * Account actions
 *
 */

import {MessageOptions, showMessage} from 'react-native-flash-message';
import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING
} from './constants';
import handleError, { ErrorResponse } from '../../utils/error';
import axiosInstance from '../../services/axios';

interface FormData {
  [key: string]: string;
}

export const accountChange = (name: string, value: string) => {
  let formData: FormData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT
  };
};

export const setProfileLoading = (value: boolean) => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value
  };
};

export const fetchProfile = () => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axiosInstance.get(`/api/user`);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      handleError(error as unknown as ErrorResponse, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const updateProfile = () => {
  return async (dispatch: any, getState: any) => {
    const profile = getState().account.user;

    try {
      const response = await axiosInstance.put(`/api/user`, {
        profile
      });

      const successfulOptions: MessageOptions = {
        message: 'Success',
        description: response.data.message,
        type: 'success',
        duration: 3000,
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(showMessage(successfulOptions));
    } catch (error) {
      handleError(error as unknown as ErrorResponse, dispatch);
    }
  };
};