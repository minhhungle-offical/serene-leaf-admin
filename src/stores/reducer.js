import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { productReducer } from './slices/productSlice'
import { categoryReducer } from './slices/categorySlice'

export const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
})
