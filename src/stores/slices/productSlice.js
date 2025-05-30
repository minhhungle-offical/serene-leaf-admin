import { productApi } from '@/api/productApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: 'idle', // idle | loading | loaded | updated | created | removed | failed
  error: null,
  resId: '',

  filter: {
    page: 1,
    limit: 5,
  },
  total: 0,
}

// === Thunks ===

export const productGetAll = createAsyncThunk(
  'products/getAll',
  async (params, { rejectWithValue }) => {
    try {
      return await productApi.getAll(params)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách sản phẩm')
    }
  },
)

export const productAdd = createAsyncThunk('products/add', async (data, { rejectWithValue }) => {
  try {
    return await productApi.add(data)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm sản phẩm')
  }
})

export const productEdit = createAsyncThunk(
  'products/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productApi.edit(id, data)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật sản phẩm')
    }
  },
)

export const productRemove = createAsyncThunk(
  'products/remove',
  async (id, { rejectWithValue }) => {
    try {
      await productApi.remove(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xoá sản phẩm')
    }
  },
)

// === Slice ===

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },

    setFilter(state, { payload }) {
      state.filter = payload
    },

    resetResId(state) {
      state.resId = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(productGetAll.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(productGetAll.fulfilled, (state, { payload }) => {
        state.status = 'loaded'
        state.data = payload.data
        state.total = payload.meta.total
      })
      .addCase(productGetAll.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // ADD
      .addCase(productAdd.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(productAdd.fulfilled, (state, { payload }) => {
        state.status = 'created'
        state.resId = payload._id
      })
      .addCase(productAdd.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // EDIT
      .addCase(productEdit.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(productEdit.fulfilled, (state) => {
        state.status = 'updated'
      })
      .addCase(productEdit.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // REMOVE
      .addCase(productRemove.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(productRemove.fulfilled, (state) => {
        state.status = 'removed'
      })
      .addCase(productRemove.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  },
})

export const { actions: productActions, reducer: productReducer } = productSlice
