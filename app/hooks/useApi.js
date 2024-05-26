import {useState} from 'react';
import api from '../services/axiosClient';
import {AlertHelper} from '../utils/AlertHelper';

export const useApi = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApiCall = async (endpoint, data, onSuccess) => {
    if (!data) {
      AlertHelper.show('error', 'Please enter the required information');
      return;
    }
    setIsProcessing(true);
    await api
      .post(endpoint, data)
      .then((res) => {
        if (res.data?.success) {
          onSuccess(res.data);
          setIsProcessing(false);
        }
      })
      .catch((err) => {
        AlertHelper.show('error', err.response.data.error);
        setIsProcessing(false);
      });
  };

  return {isProcessing, handleApiCall};
};
