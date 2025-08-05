import { CommonActions } from '@react-navigation/native';
import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
} from './constants';

import handleError from '../../utils/error';
import {
  formatSelectOptions,
  unformatSelectOptions,
} from '../../helpers/select';
import axiosInstance from '../../services/axios';

export const productChange = (name: string, value: any) => {
  let formData: { [key: string]: any } = {};
  formData[name] = value;
  console.log(formData);
  return {
    type: PRODUCT_CHANGE,
    payload: formData,
  };
};

export const productEditChange = (name: string, value: any) => {
  let formData: { [key: string]: any } = {};
  formData[name] = value;

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData,
  };
};

export const productShopChange = (name: string, value: any) => {
  let formData: { [key: string]: any } = {};
  formData[name] = value;

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData,
  };
};

export const resetProduct = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: RESET_PRODUCT });
  };
};

// fetch products api
export const fetchProducts = () => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const response = await axiosInstance.get(`/api/product`);

      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch store products by filterProducts api
export const filterProducts = (n: string, v: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      if (n === undefined) {
        dispatch({ type: RESET_ADVANCED_FILTERS });
      }

      const s = getState().product.advancedFilters;
      let payload = productsFilterOrganizer(n, v, s);

      dispatch({ type: SET_ADVANCED_FILTERS, payload });
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

      const sortOrder = getSortOrder(payload.order);

      payload = { ...payload, sortOrder };

      const response = await axiosInstance.post(`/api/product/list`, payload);

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(payload, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

// fetch product api
export const fetchProduct = (id: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axiosInstance.get(`/api/product/${id}`);

      const inventory = response.data.product.quantity;

      const brand = response.data.product.brand;
      const isBrand = brand ? true : false;
      const brandData = formatSelectOptions(
        isBrand ? [brand] : [],
        !isBrand,
        'fetchProduct'
      );

      response.data.product.brand = brandData[0];

      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_PRODUCT,
        payload: product,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

// fetch store product api
export const fetchStoreProduct = (slug: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axiosInstance.get(`/api/product/item/${slug}`);

      const inventory = response.data.product.quantity;
      const product = { ...response.data.product, inventory };

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchBrandProducts = (slug: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true });

    try {
      const response = await axiosInstance.get(`/api/product/list/brand/${slug}`);

      const s = getState().product.advancedFilters;
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      });
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data.products,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
    }
  };
};

export const fetchProductsSelect = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axiosInstance.get(`/api/product/list/select`);

      const formattedProducts = formatSelectOptions(response.data.products);

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts,
      });
    } catch (error: any) {
      handleError(error, dispatch);
    }
  };
};

interface State {
    name: string;
    category: string;
    brand: string;
    min: number;
    max: number;
    rating: number;
    order: number;
    pageNumber: number;
  }
  
  interface FilteredState extends State {
    pages?: number;
    totalProducts?: number;
  sortOrder?: { [key: string]: number };
}

const productsFilterOrganizer = (
    n: string,
    v: any,
    s: State
  ): FilteredState => {
    switch (n) {
      case "category":
        return {
          name: s.name,
          category: v,
          brand: s.brand,
          min: s.min,
          max: s.max,
          rating: s.rating,
          order: s.order,
          pageNumber: 1, //s.pageNumber
        };
      case "brand":
        return {
          name: s.name,
          category: s.category,
          brand: v,
          min: s.min,
          max: s.max,
          rating: s.rating,
          order: s.order,
          pageNumber: s.pageNumber,
        };
      case "sorting":
        return {
          name: s.name,
          category: s.category,
          brand: s.brand,
          min: s.min,
          max: s.max,
          rating: s.rating,
          order: v,
          pageNumber: s.pageNumber,
        };
      case "price":
        return {
          name: s.name,
          category: s.category,
          brand: s.brand,
          min: v[0],
          max: v[1],
          rating: s.rating,
          order: s.order,
          pageNumber: s.pageNumber,
        };
      case "rating":
        return {
          name: s.name,
          category: s.category,
          brand: s.brand,
          min: s.min,
          max: s.max,
          rating: v,
          order: s.order,
          pageNumber: s.pageNumber,
        };
      case "pagination":
        return {
          name: s.name,
          category: s.category,
          brand: s.brand,
          min: s.min,
          max: s.max,
          rating: s.rating,
          order: s.order,
          pageNumber: v,
        };
      default:
        return {
          name: s.name,
          category: s.category,
          brand: s.brand,
          min: s.min,
          max: s.max,
          rating: s.rating,
          order: s.order,
          pageNumber: s.pageNumber,
        };
    }
  };
  
  const getSortOrder = (value: number): { [key: string]: number } => {
    let sortOrder: { [key: string]: number } = {};
    switch (value) {
      case 0:
        sortOrder._id = -1;
        break;
      case 1:
        sortOrder.price = -1;
        break;
      case 2:
        sortOrder.price = 1;
        break;
      default:
        break;
    }
  
    return sortOrder;
  };