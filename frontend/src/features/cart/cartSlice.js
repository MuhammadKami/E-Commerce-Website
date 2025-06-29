import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += product.quantity; // 👈 Add passed quantity
      } else {
        state.items.push({ ...product });
      }

      state.totalItems += product.quantity;
      state.totalAmount += product.price * product.quantity;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item) => item._id === id);

      if (existing) {
        state.totalItems -= existing.quantity;
        state.totalAmount -= existing.price * existing.quantity;
        state.items = state.items.filter((item) => item._id !== id);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item && quantity > 0) {
        state.totalItems += quantity - item.quantity;
        state.totalAmount += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
