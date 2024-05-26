import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../configs';


// Create an instance of Axios
const api = axios.create({baseURL: config.baseApiUrl});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the token from your storage
    const token = await AsyncStorage.getItem('token');

    // If the token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Set the Content-Type for all requests
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // response.data = transformData(response.data);
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  },
);

export default api;