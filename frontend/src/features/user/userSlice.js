// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Async action to fetch logged-in user details
export const fetchUser = createAsyncThunk('user/fetchUser', async (token, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    wishlist: [],
    cartHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
    },
    clearUserData: (state) => {
      state.userInfo = null;
      state.wishlist = [];
      state.cartHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.wishlist = action.payload.wishlist || [];
        state.cartHistory = action.payload.cartHistory || [];
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
