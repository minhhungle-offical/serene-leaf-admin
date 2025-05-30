import { authApi } from '@/api/authApi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const name = 'auth'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
}

// === Thunks ===
export const login = createAsyncThunk(`${name}/login`, async (credentials, { rejectWithValue }) => {
  try {
    return await authApi.login(credentials)
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Đăng nhập thất bại')
  }
})

export const register = createAsyncThunk(`${name}/register`, async (data, { rejectWithValue }) => {
  try {
    return await authApi.register(data)
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Đăng ký thất bại')
  }
})

export const logout = createAsyncThunk(`${name}/logout`, async (_, { rejectWithValue }) => {
  try {
    await authApi.logout()
    return true
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Đăng xuất thất bại')
  }
})

// === Slice ===

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },
    setCredentials(state, { payload }) {
      state.user = payload.user
      state.token = payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'logged-in'
        console.log('payload: ', payload)
        state.user = payload.user
        state.token = payload.token
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'signed'
        state.user = payload.user
        state.token = payload.token
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle'
        state.user = null
        state.token = null
        state.error = null
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  },
})

export const { reducer: authReducer, actions: authActions } = authSlice
export const { resetStatus, setCredentials } = authActions
