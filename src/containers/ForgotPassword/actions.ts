/*
 *
 * ForgotPassword actions
 *
 */

import {CommonActions} from '@react-navigation/native';
import {showMessage, MessageOptions} from 'react-native-flash-message';
import * as yup from 'yup';

import {
  FORGOT_PASSWORD_CHANGE,
  SET_FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS,
} from './constants';
import handleError from '../../utils/error';
import {allFieldsValidation} from '../../utils/validation';
import axiosInstance from '../../services/axios';

interface ForgotPasswordFormData {
  email: string;
}

export const forgotPasswordChange = (name: string, value: string) => {
  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: value,
  };
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email format is invalid')
    .required('Email is required'),
});

export const forgotPassword = (navigation: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const user: ForgotPasswordFormData =
        getState().forgotPassword.forgotFormData;

      const {isValid, errors} = await allFieldsValidation(user, schema);

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors,
        });
      }

      dispatch({type: SET_FORGOT_PASSWORD_LOADING, payload: true});

      const response = await axiosInstance.post('/api/auth/forgot', user);
      const successfulOptions: MessageOptions = {
        message: `${response.data.message}`,
        type: 'success',
        duration: 3000,
      };

      if (response.data.success === true) {
        navigation.dispatch(CommonActions.navigate({name: 'Login'}));
      }
      showMessage(successfulOptions);

      dispatch({type: FORGOT_PASSWORD_RESET});
    } catch (error: any) {
      const title = `Please try again!`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({type: SET_FORGOT_PASSWORD_LOADING, payload: false});
    }
  };
};
