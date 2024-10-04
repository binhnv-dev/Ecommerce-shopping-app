/*
 *
 * reducers.js
 * reducers configuration
 */

import { combineReducers } from "redux";

// import reducers
import loginReducer from "./containers/Login/reducer";
import authenticationReducer from "./containers/Authentication/reducer";
import accountReducer from "./containers/Account/reducer";
import signupReducer from "./containers/Signup/reducer";
import forgotPasswordReducer from "./containers/ForgotPassword/reducer";
import shopReducer from "./containers/Shop/reducer";
import productReducer from "./containers/Product/reducer";
import wishListReducer from "./containers/Wishlist/reducer";
import reviewReducer from "./containers/Review/reducer";
import cartReducer from "./containers/Cart/reducer";
import navigationReducer from "./containers/Navigation/reducer";
import orderReducer from "./containers/Order/reducer";

const createReducer = () =>
  combineReducers({
    signup: signupReducer,
    login: loginReducer,
    authentication: authenticationReducer,
    account: accountReducer,
    forgotPassword: forgotPasswordReducer,
    shop: shopReducer,
    product: productReducer,
    wishlist: wishListReducer,
    review: reviewReducer,
    cart: cartReducer,
    navigation: navigationReducer,
    order: orderReducer,
  });

export default createReducer;
