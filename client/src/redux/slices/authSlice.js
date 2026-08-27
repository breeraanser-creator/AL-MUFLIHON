import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

const storedUser = localStorage.getItem('almuflihon_user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

// Async Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(userData);
      localStorage.setItem('almuflihon_user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(credentials);
      localStorage.setItem('almuflihon_user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      return await authAPI.forgotPassword(email);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to request reset');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const data = await authAPI.resetPassword(token, password);
      localStorage.setItem('almuflihon_user', JSON.stringify(data));
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to reset password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser ? initialUser.user : null,
    token: initialUser ? initialUser.token : null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('almuflihon_user');
    },
    clearAuthStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    updateUserLocal: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      const current = JSON.parse(localStorage.getItem('almuflihon_user') || '{}');
      current.user = state.user;
      localStorage.setItem('almuflihon_user', JSON.stringify(current));
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.successMessage = action.payload.message;
      });
  }
});

export const { logout, clearAuthStatus, updateUserLocal } = authSlice.actions;
export default authSlice.reducer;
