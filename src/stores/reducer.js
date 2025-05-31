import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { productReducer } from './slices/productSlice'
import { categoryReducer } from './slices/categorySlice'
import { postCategoryReducer } from './slices/postCategorySlice'
import { postReducer } from './slices/postSlice'

export const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  postCategory: postCategoryReducer,
  post: postReducer,
})
