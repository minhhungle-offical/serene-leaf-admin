import { categoryApi } from '@/api/categoryApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: 'idle', // idle | loading | loaded | created | updated | removed | failed
  error: null,
  resId: '',
  filter: {
    page: 1,
    limit: 5,
  },
}

// === Thunks ===

export const categoryGetAll = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryApi.getAll()
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách danh mục')
    }
  },
)

export const categoryAdd = createAsyncThunk('categories/add', async (data, { rejectWithValue }) => {
  try {
    return await categoryApi.add(data)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm danh mục')
  }
})

export const categoryEdit = createAsyncThunk(
  'categories/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await categoryApi.edit(id, data)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật danh mục')
    }
  },
)

export const categoryRemove = createAsyncThunk(
  'categories/remove',
  async (id, { rejectWithValue }) => {
    try {
      await categoryApi.remove(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xoá danh mục')
    }
  },
)

// === Slice ===

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },
    resetResId(state) {
      state.resId = ''
    },
    setFilter(state, { payload }) {
      state.filter = payload
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(categoryGetAll.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(categoryGetAll.fulfilled, (state, { payload }) => {
        state.status = 'loaded'
        state.data = payload
      })
      .addCase(categoryGetAll.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // ADD
      .addCase(categoryAdd.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.status = 'created'
        state.resId = payload._id
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // EDIT
      .addCase(categoryEdit.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(categoryEdit.fulfilled, (state) => {
        state.status = 'updated'
      })
      .addCase(categoryEdit.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // REMOVE
      .addCase(categoryRemove.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(categoryRemove.fulfilled, (state) => {
        state.status = 'removed'
      })
      .addCase(categoryRemove.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  },
})

export const { actions: categoryActions, reducer: categoryReducer } = categorySlice
