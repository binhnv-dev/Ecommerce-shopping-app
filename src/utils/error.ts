import {showMessage} from 'react-native-flash-message';
import {signOut} from '../containers/Login/actions';

export interface ErrorResponse {
  response?: {
    status: number;
    data: {
      error: string;
      message?: string;
    };
  };
  message?: string;
}

const handleError = (err: ErrorResponse, dispatch: any, title: string = '') => {
  const showError = (message: string) => {
    showMessage({
      message: title || 'Error',
      description: message,
      type: 'danger',
      duration: 3000,
    });
  };

  if (err.response) {
    if (err.response.status === 400) {
      showError(err.response.data.error || 'Please Try Again!');
    } else if (err.response.status === 404) {
      // Uncomment and customize if needed
      // showError(err.response.data.message || 'Your request could not be processed. Please try again.');
    } else if (err.response.status === 401) {
      showError('Unauthorized Access! Please login again');
      dispatch(signOut());
    } else if (err.response.status === 403) {
      showError('Forbidden! You are not allowed to access this resource.');
    }
  } else if (err.message) {
    showError(err.message);
  } else {
    showError('Your request could not be processed. Please try again.');
  }
};

export default handleError;
