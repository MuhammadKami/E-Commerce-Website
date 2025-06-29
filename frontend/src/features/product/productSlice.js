// features/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// BASE URL
const API = "http://localhost:5000/api/products";

// ✅ Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "Something went wrong"
      );
    }
  }
);

// ✅ Fetch All Products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "Failed to fetch products"
      );
    }
  }
);

// ✅ Fetch Single Product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "Failed to fetch product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        updatedData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Delete failed");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    singleProduct: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Product added successfully!";
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
        state.success = "Product updated successfully!";
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
        state.success = "Product deleted successfully!";
      });
  },
});

export const { clearStatus } = productSlice.actions;
export default productSlice.reducer;

// ✅ Export thunks
// export { fetchProducts, fetchProductById, addProduct };
