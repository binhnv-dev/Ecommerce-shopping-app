/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators, Dispatch } from "redux";

import * as authentication from "./containers/Authentication/actions";
import * as login from "./containers/Login/actions";
import * as account from "./containers/Account/actions";
import * as signup from "./containers/Signup/actions";
import * as forgotPassword from "./containers/ForgotPassword/actions";
import * as shop from "./containers/Shop/actions";
import * as product from "./containers/Product/actions";
import * as wishlist from "./containers/Wishlist/actions";
import * as review from "./containers/Review/actions";
import * as cart from "./containers/Cart/actions";
import * as navigation from "./containers/Navigation/actions";
import * as order from "./containers/Order/actions";

export default function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      ...authentication,
      ...signup,
      ...login,
      ...account,
      ...forgotPassword,
      ...shop,
      ...product,
      ...wishlist,
      ...review,
      ...cart,
      ...navigation,
      ...order,
    },
    dispatch
  );
}
