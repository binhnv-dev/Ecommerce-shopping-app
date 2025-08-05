/*
 *
 * Products reducer
 *
 */

import { DEFAULT_ACTION } from './constants';

interface ProductsState {
  // Define the shape of your state here
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: ProductsState = {
  // Initialize your state here
};

const productsReducer = (state = initialState, action: Action): ProductsState => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default productsReducer;