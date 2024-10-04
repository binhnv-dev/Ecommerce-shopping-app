import { Dispatch } from 'redux';
import { showMessage } from 'react-native-flash-message';
import * as yup from 'yup';

import {
  FETCH_REVIEWS,
  SET_REVIEWS_LOADING,
  ADD_REVIEW,
  REMOVE_REVIEW,
  FETCH_PRODUCT_REVIEWS,
  REVIEW_CHANGE,
  RESET_REVIEW,
  SET_REVIEW_FORM_ERRORS
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import axiosInstance from '../../services/axios';

interface Review {
  _id: string;
  rating: number;
  review: string;
  title: string;
  isRecommended: boolean;
}

interface ReviewSummary {
  ratingSummary: { [key: number]: number }[];
  totalRatings: number;
  totalReviews: number;
  totalSummary: number;
}

export const reviewChange = (name: string, value: any) => {
  let formData: { [key: string]: any } = {};
  formData[name] = value;
  return {
    type: REVIEW_CHANGE,
    payload: formData
  };
};

// fetch reviews api
export const fetchReviews = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SET_REVIEWS_LOADING, payload: true });

      const response = await axiosInstance.get(`/api/review`);

      dispatch({ type: FETCH_REVIEWS, payload: response.data.reviews });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_REVIEWS_LOADING, payload: false });
    }
  };
};

export const approveReview = (review: Review) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance.put(`/api/review/approve/${review._id}`);

      dispatch<any>(fetchReviews());
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const rejectReview = (review: Review) => {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance.put(`/api/review/reject/${review._id}`);

      dispatch(fetchReviews());
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

// delete review api
export const deleteReview = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.delete(`/api/review/delete/${id}`);

      if (response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'success',
          position: 'top',
          duration: 2000
        });
        dispatch({
          type: REMOVE_REVIEW,
          payload: id
        });
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

// fetch product reviews api
export const fetchProductReviews = (slug: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.get(`/api/review/${slug}`);

      const {
        ratingSummary,
        totalRatings,
        totalReviews,
        totalSummary
      } = getProductReviewsSummary(response.data.reviews);

      dispatch({
        type: FETCH_PRODUCT_REVIEWS,
        payload: {
          reviews: response.data.reviews,
          reviewsSummary: {
            ratingSummary,
            totalRatings,
            totalReviews,
            totalSummary
          }
        }
      });
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

const addReviewSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    review: yup.string().required('Review is required.'),
    rating: yup.number().required('Rating is required.').min(1),
    isRecommended: yup.boolean().required('Recommendable is required.')
  });

export const addProductReview = () => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const review = getState().review.reviewFormData;
      const product = getState().product.storeProduct;

      const newReview = {
        product: product._id,
        isRecommended: review.isRecommended.value,
        rating: review.rating,
        review: review.review,
        title: review.title
      };

      const { isValid, errors } = await allFieldsValidation(newReview, addReviewSchema);

      if (!isValid) {
        return dispatch({ type: SET_REVIEW_FORM_ERRORS, payload: errors });
      }

      const response = await axiosInstance.post(`/api/review/add`, newReview);

      if (response.data.success) {
        showMessage({
          message: response.data.message,
          type: 'success',
          position: 'top',
          duration: 2000
        });
        dispatch(fetchProductReviews(product.slug));
        dispatch({ type: RESET_REVIEW });
      }
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

export const getProductReviewsSummary = (reviews: Review[]): ReviewSummary => {
  let ratingSummary: any = [{ 5: 0 }, { 4: 0 }, { 3: 0 }, { 2: 0 }, { 1: 0 }];
  let totalRatings = 0;
  let totalReviews = 0;
  let totalSummary = 0;

  if (reviews.length > 0) {
    reviews.forEach((item) => {
      totalRatings += item.rating;
      totalReviews += 1;

      switch (Math.round(item.rating)) {
        case 5:
          ratingSummary[0][5] += 1;
          totalSummary += 1;
          break;
        case 4:
          ratingSummary[1][4] += 1;
          totalSummary += 1;
          break;
        case 3:
          ratingSummary[2][3] += 1;
          totalSummary += 1;
          break;
        case 2:
          ratingSummary[3][2] += 1;
          totalSummary += 1;
          break;
        case 1:
          ratingSummary[4][1] += 1;
          totalSummary += 1;
          break;
        default:
          break;
      }
    });
  }

  return { ratingSummary, totalRatings, totalReviews, totalSummary };
};