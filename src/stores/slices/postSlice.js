import { postApi } from '@/api/postApi'
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
  total: 0,
}

// === Thunks ===

export const postGetAll = createAsyncThunk('posts/getAll', async (params, { rejectWithValue }) => {
  try {
    return await postApi.getAll(params)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi lấy danh sách bài viết')
  }
})

export const postAdd = createAsyncThunk('posts/add', async (data, { rejectWithValue }) => {
  try {
    return await postApi.add(data)
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi thêm bài viết')
  }
})

export const postEdit = createAsyncThunk(
  'posts/edit',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await postApi.edit(id, data)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Lỗi khi cập nhật bài viết')
    }
  },
)

export const postRemove = createAsyncThunk('posts/remove', async (id, { rejectWithValue }) => {
  try {
    await postApi.remove(id)
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi khi xoá bài viết')
  }
})

// === Slice ===

const postSlice = createSlice({
  name: 'posts',
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
      .addCase(postGetAll.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postGetAll.fulfilled, (state, { payload }) => {
        state.status = 'loaded'
        state.data = payload.data
        state.total = payload.meta?.total || 0
      })
      .addCase(postGetAll.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // ADD
      .addCase(postAdd.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postAdd.fulfilled, (state, { payload }) => {
        state.status = 'created'
        state.resId = payload._id
      })
      .addCase(postAdd.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // EDIT
      .addCase(postEdit.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postEdit.fulfilled, (state) => {
        state.status = 'updated'
      })
      .addCase(postEdit.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // REMOVE
      .addCase(postRemove.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postRemove.fulfilled, (state) => {
        state.status = 'removed'
      })
      .addCase(postRemove.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  },
})

export const { actions: postActions, reducer: postReducer } = postSlice
