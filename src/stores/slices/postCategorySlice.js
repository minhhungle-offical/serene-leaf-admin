import { postCategoryApi } from '@/api/postCategoryApi'
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

export const postCategoryGetAll = createAsyncThunk(
  'post-category/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await postCategoryApi.getAll()
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách danh mục')
    }
  },
)

export const postCategoryAdd = createAsyncThunk(
  'post-category/add',
  async (data, { rejectWithValue }) => {
    try {
      return await postCategoryApi.add(data)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm danh mục')
    }
  },
)

export const postCategoryEdit = createAsyncThunk(
  'post-category/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await postCategoryApi.edit(id, data)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật danh mục')
    }
  },
)

export const postCategoryRemove = createAsyncThunk(
  'post-category/remove',
  async (id, { rejectWithValue }) => {
    try {
      await postCategoryApi.remove(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi xoá danh mục')
    }
  },
)

// === Slice ===

const postCategorySlice = createSlice({
  name: 'post-category',
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
      .addCase(postCategoryGetAll.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postCategoryGetAll.fulfilled, (state, { payload }) => {
        state.status = 'loaded'
        state.data = payload
      })
      .addCase(postCategoryGetAll.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // ADD
      .addCase(postCategoryAdd.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postCategoryAdd.fulfilled, (state, { payload }) => {
        state.status = 'created'
        state.resId = payload._id
      })
      .addCase(postCategoryAdd.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // EDIT
      .addCase(postCategoryEdit.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postCategoryEdit.fulfilled, (state) => {
        state.status = 'updated'
      })
      .addCase(postCategoryEdit.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // REMOVE
      .addCase(postCategoryRemove.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postCategoryRemove.fulfilled, (state) => {
        state.status = 'removed'
      })
      .addCase(postCategoryRemove.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  },
})

export const { actions: postCategoryActions, reducer: postCategoryReducer } = postCategorySlice
