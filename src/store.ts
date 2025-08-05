/**
 *
 * store.ts
 * store configuration
 */

import { createStore, compose, applyMiddleware, Store, Reducer, AnyAction } from 'redux';
import * as thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReducer from './reducers';

const middlewares: any[] = [thunk.thunk];

const composeEnhancers = composeWithDevTools || compose;

const store: Store<any, AnyAction> = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(...middlewares))
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer: Reducer<any, AnyAction> = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export type RootState = ReturnType<typeof store.getState>;
export default store;