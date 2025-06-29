// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// ✅ LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return user;
    } catch (err) {
      console.error("Login failed:", err);
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);


// ✅ SIGNUP THUNK
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      
      const { token, user } = res.data;

if (token) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
return user;


    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
