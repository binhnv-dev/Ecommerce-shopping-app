/*
 *
 * Signup actions
 *
 */

import { showMessage, MessageOptions } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SET_SIGNUP_SUBMITTING,
  SUBSCRIBE_CHANGE,
  SET_SIGNUP_FORM_ERRORS,
} from './constants';

import { setAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import axiosInstance from '../../services/axios';

interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const signupChange = (name: string, value: string) => {
  let formData: Partial<SignupFormData> = {};
  (formData as any)[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData,
  };
};

export const subscribeChange = () => {
  return {
    type: SUBSCRIBE_CHANGE,
  };
};

const signupSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

export const signUp = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const newUser: SignupFormData = getState().signup.signupFormData;
      const isSubscribed: boolean = getState().signup.isSubscribed;

      const { isValid, errors } = await allFieldsValidation(newUser, signupSchema);

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
      dispatch({ type: SET_SIGNUP_LOADING, payload: true });

      const user = {
        isSubscribed,
        ...newUser,
      };

      const response = await axiosInstance.post('/api/auth/register', user);

      const successfulOptions: MessageOptions = {
        message: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
        type: 'success',
        duration: 3000,
      };

      await AsyncStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      showMessage(successfulOptions);
      dispatch({ type: SIGNUP_RESET });
    } catch (error: any) {
      const title = `Please try to signup again!`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
    }
  };
};