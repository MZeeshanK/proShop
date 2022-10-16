import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const preloadedState = {};

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
