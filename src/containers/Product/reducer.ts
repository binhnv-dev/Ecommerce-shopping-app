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
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT,
  RESET_PRODUCT_SHOP,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
} from './constants';

export interface Product {
  _id: string;
  sku?: string;
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  image?: any;
  isActive?: boolean;
  taxable?: {value: number; label: string};
  brand?: {value: number; label: string};
}

interface AdvancedFilters {
  name: string;
  category: string;
  brand: string;
  min: number;
  max: number;
  rating: number;
  order: number;
  pageNumber: number;
  pages: number;
  totalProducts: number;
}

interface ProductState {
  products: Product[];
  storeProducts: Product[];
  product: Product;
  storeProduct: Product;
  productsSelect: {value: string | number; label: string}[];
  productFormData: Product;
  isLoading: boolean;
  productShopData: {quantity: number};
  formErrors: {[key: string]: string};
  editFormErrors: {[key: string]: string};
  shopFormErrors: {[key: string]: string};
  advancedFilters: AdvancedFilters;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: ProductState = {
  products: [],
  storeProducts: [],
  product: {_id: ''},
  storeProduct: {_id: ''},
  productsSelect: [],
  productFormData: {
    sku: '',
    name: '',
    description: '',
    quantity: 1,
    price: 1,
    image: {},
    isActive: true,
    taxable: {value: 0, label: 'No'},
    brand: {value: 0, label: 'No Options Selected'},
    _id: '',
  },
  isLoading: false,
  productShopData: {quantity: 1},
  formErrors: {},
  editFormErrors: {},
  shopFormErrors: {},
  advancedFilters: {
    name: 'all',
    category: 'all',
    brand: 'all',
    min: 1,
    max: 500,
    rating: 0,
    order: 0,
    pageNumber: 1,
    pages: 1,
    totalProducts: 0,
  },
};

const productReducer = (state = initialState, action: Action): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_STORE_PRODUCTS:
      return {
        ...state,
        storeProducts: action.payload,
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        editFormErrors: {},
      };
    case FETCH_STORE_PRODUCT:
      return {
        ...state,
        storeProduct: action.payload,
        productShopData: {quantity: 1},
        shopFormErrors: {},
      };
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_PRODUCTS_SELECT:
      return {...state, productsSelect: action.payload};
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case REMOVE_PRODUCT:
      const index = state.products.findIndex(b => b._id === action.payload);
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          ...state.products.slice(index + 1),
        ],
      };
    case PRODUCT_CHANGE:
      return {
        ...state,
        productFormData: {
          ...state.productFormData,
          ...action.payload,
        },
      };
    case PRODUCT_EDIT_CHANGE:
      return {
        ...state,
        product: {
          ...state.product,
          ...action.payload,
        },
      };
    case PRODUCT_SHOP_CHANGE:
      return {
        ...state,
        productShopData: {
          ...state.productShopData,
          ...action.payload,
        },
      };
    case SET_PRODUCT_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    case SET_PRODUCT_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload,
      };
    case SET_PRODUCT_SHOP_FORM_ERRORS:
      return {
        ...state,
        shopFormErrors: action.payload,
      };
    case RESET_PRODUCT:
      return {
        ...state,
        productFormData: {
          sku: '',
          name: '',
          description: '',
          quantity: 1,
          price: 1,
          image: {},
          isActive: true,
          taxable: {value: 0, label: 'No'},
          brand: {value: 0, label: 'No Options Selected'},
          _id: '',
        },
        product: {_id: ''},
        formErrors: {},
      };
    case RESET_PRODUCT_SHOP:
      return {
        ...state,
        productShopData: {quantity: 1},
        shopFormErrors: {},
      };
    case SET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          ...state.advancedFilters,
          ...action.payload,
        },
      };
    case RESET_ADVANCED_FILTERS:
      return {
        ...state,
        advancedFilters: {
          name: 'all',
          category: 'all',
          brand: 'all',
          min: 1,
          max: 500,
          rating: 0,
          order: 0,
          pageNumber: 1,
          pages: 1,
          totalProducts: 0,
        },
      };
    default:
      return state;
  }
};

export default productReducer;