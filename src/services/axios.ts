import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../helpers/navigation';
import { showMessage } from 'react-native-flash-message';
import configs from '../configs';

const axiosInstance = axios.create({
  baseURL: configs.api.url,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
        showMessage({
            message: 'Session expired. Please login again.',
            type: 'danger',
            animated: true,
            autoHide: true,
            onHide: () => {
                AsyncStorage.removeItem('token');
                navigate('Login');
            },
        })
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;