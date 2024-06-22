import axios from 'axios';
import { configs } from '../../configs';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_UPDATE_STOCK_REQUEST,
  PRODUCT_UPDATE_STOCK_SUCCESS,
  PRODUCT_UPDATE_STOCK_FAIL,
} from '../constants/productConstants';

const { LOCAL_SERVER_URL } = configs;

export const listProducts = (
  filter
) => async dispatch => {
  try {
    dispatch({type: PRODUCT_LIST_REQUEST});

    const {data} = await axios.post(
      `${LOCAL_SERVER_URL}/api/product/list`,
      {
        ...filter
      }
    );

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = slug => async dispatch => {
  try {
    dispatch({type: PRODUCT_DETAILS_REQUEST});

    const {data} = await axios.get(`${LOCAL_SERVER_URL}/api/product/item/${slug}`);

    const reviews = await reviewProduct(slug);

    const product = {
      ...data.product,
      reviews
    }

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const reviewProduct = async slug => {
  try {
    const {data} = await axios.get(`${LOCAL_SERVER_URL}/api/review/${slug}`);

    return data.reviews;
  } catch (error) {
    throw new Error(error);
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    await axios.delete(`${LOCAL_SERVER_URL}/api/products/${id}`, config);

    dispatch({type: PRODUCT_DELETE_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const {data} = await axios.post(
      `${LOCAL_SERVER_URL}/api/products`,
      {},
      config,
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const {data} = await axios.put(
      `${LOCAL_SERVER_URL}/api/products/${product._id}`,
      product,
      config,
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    await axios.post(
      `${LOCAL_SERVER_URL}/api/products/${productId}/reviews`,
      review,
      config,
    );

    dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopRatedProducts = () => async dispatch => {
  try {
    dispatch({type: PRODUCT_TOP_REQUEST});

    const {data} = await axios.get(`${LOCAL_SERVER_URL}/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductStock = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_STOCK_REQUEST,
    });

    const {
      userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const {data} = await axios.put(
      `${LOCAL_SERVER_URL}/api/products/${product._id}/stock`,
      product,
      config,
    );

    dispatch({
      type: PRODUCT_UPDATE_STOCK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_STOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
