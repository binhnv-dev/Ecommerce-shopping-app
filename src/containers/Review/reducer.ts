import {
    FETCH_REVIEWS,
    ADD_REVIEW,
    REMOVE_REVIEW,
    FETCH_PRODUCT_REVIEWS,
    REVIEW_CHANGE,
    SET_REVIEWS_LOADING,
    RESET_REVIEW,
    SET_REVIEW_FORM_ERRORS
  } from './constants';
  
  interface Review {
    _id: string;
    title: string;
    review: string;
    rating: number;
    isRecommended: {
      value: number;
      label: string;
    };
  }
  
  interface ReviewsSummary {
    ratingSummary: { [key: number]: number }[];
    totalRatings: number;
    totalReviews: number;
    totalSummary: number;
  }
  
  interface ReviewFormData {
    title: string;
    review: string;
    rating: number;
    isRecommended: {
      value: number;
      label: string;
    };
  }
  
  interface ReviewFormErrors {
    [key: string]: string;
  }
  
  interface ReviewState {
    reviews: Review[];
    isLoading: boolean;
    productReviews: Review[];
    reviewsSummary: ReviewsSummary;
    reviewFormData: ReviewFormData;
    reviewFormErrors: ReviewFormErrors;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: ReviewState = {
    reviews: [],
    isLoading: false,
    productReviews: [],
    reviewsSummary: {
      ratingSummary: [],
      totalRatings: 0,
      totalReviews: 0,
      totalSummary: 0
    },
    reviewFormData: {
      title: '',
      review: '',
      rating: 0,
      isRecommended: {
        value: 1,
        label: 'Yes'
      }
    },
    reviewFormErrors: {}
  };
  
  const reviewReducer = (state = initialState, action: Action): ReviewState => {
    switch (action.type) {
      case FETCH_REVIEWS:
        return {
          ...state,
          reviews: action.payload
        };
      case FETCH_PRODUCT_REVIEWS:
        return {
          ...state,
          productReviews: action.payload.reviews,
          reviewsSummary: action.payload.reviewsSummary
        };
      case ADD_REVIEW:
        return {
          ...state,
          productReviews: [...state.productReviews, action.payload]
        };
      case REMOVE_REVIEW:
        const index = state.reviews.findIndex(r => r._id === action.payload);
        return {
          ...state,
          reviews: [
            ...state.reviews.slice(0, index),
            ...state.reviews.slice(index + 1)
          ]
        };
      case REVIEW_CHANGE:
        return {
          ...state,
          reviewFormData: {
            ...state.reviewFormData,
            ...action.payload
          }
        };
      case SET_REVIEWS_LOADING:
        return {
          ...state,
          isLoading: action.payload
        };
      case RESET_REVIEW:
        return {
          ...state,
          reviewFormData: {
            title: '',
            review: '',
            rating: 0,
            isRecommended: {
              value: 1,
              label: 'Yes'
            }
          },
          reviewFormErrors: {}
        };
      case SET_REVIEW_FORM_ERRORS:
        return {
          ...state,
          reviewFormErrors: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default reviewReducer;