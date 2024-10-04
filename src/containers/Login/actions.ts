/*
 *
 * Login actions
 *
 */

import {MessageOptions, showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING,
} from './constants';
import {setAuth, clearAuth} from '../Authentication/actions';
import setToken from '../../utils/token';
import handleError from '../../utils/error';
import {clearAccount} from '../Account/actions';
import {allFieldsValidation} from '../../utils/validation';
import {navigate} from '../../helpers/navigation';
import axiosInstance from '../../services/axios';

export const loginChange = (name: string, value: string) => {
  let formData: Record<string, string> = {};
  formData[name] = value;

  return {
    type: LOGIN_CHANGE,
    payload: formData,
  };
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email format is invalid')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('len', 'Password must be at least 6 characters', function (val) {
      if (!val) {
        return true;
      }
      
      return val.length >= 6;
    }),
});

export const login = () => {
  return async (dispatch: any, getState: any) => {
    const user = getState().login.loginFormData;
    const {isValid, errors} = await allFieldsValidation(user, schema);
    if (!isValid) {
      return dispatch({type: SET_LOGIN_FORM_ERRORS, payload: errors});
    }

    dispatch({type: SET_LOGIN_SUBMITTING, payload: true});
    dispatch({type: SET_LOGIN_LOADING, payload: true});

    try {
      const response = await axiosInstance.post('/api/auth/login', user);
      const firstName = response.data.user.firstName;

      const successfulOptions: MessageOptions = {
        message: `Hey${firstName ? ` ${firstName}` : ''}, Welcome Back!`,
        type: 'info',
        duration: 3000,
        animated: true,
      };

      await AsyncStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      showMessage(successfulOptions)

      dispatch({type: LOGIN_RESET});
    } catch (error: any) {
      const title = `Please try to login again!`;
      handleError(error, dispatch, title);
    } finally {
      dispatch({type: SET_LOGIN_SUBMITTING, payload: false});
      dispatch({type: SET_LOGIN_LOADING, payload: false});
    }
  };
};

export const signOut = () => {
  return async (dispatch: any, getState: any) => {
    const successfulOptions: MessageOptions = {
      message: `You have signed out!`,
      type: 'info',
      duration: 3000,
      animated: true,
    };

    dispatch(clearAuth());
    dispatch(clearAccount());
    navigate('Login');

    await AsyncStorage.removeItem('token');

    dispatch(showMessage(successfulOptions));
  };
};
