import {LOGIN, LOG_OUT, RESET_PASSWORD} from '../authAction';

const initialState = {
  user: {},
  isGuest:true,
  resetToken: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isGuest:false,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isGuest:true
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetToken: action.payload,
      };
    default:
      return state; //must be like this so it can  presist the reducers
  }
}
