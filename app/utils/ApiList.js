import {config} from '../configs';

const {baseApiUrl} = config;

export const PRODUCTS_BY_CATEGORY = `${baseApiUrl}products/category`; //jewelery
export const PRODUCTS_LIST = `${baseApiUrl}products?limit=7`; //jewelery
