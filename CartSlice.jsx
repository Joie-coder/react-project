import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }

      state.totalQuantity += 1;

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    increaseQuantity(state, action) {
      const id = action.payload;

      const item = state.cartItems.find(
        (product) => product.id === id
      );

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;

        state.totalQuantity += 1;

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },

    decreaseQuantity(state, action) {
      const id = action.payload;

      const item = state.cartItems.find(
        (product) => product.id === id
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
        state.totalQuantity -= 1;
      } else {
        state.totalQuantity -= 1;

        state.cartItems = state.cartItems.filter(
          (product) => product.id !== id
        );
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    removeItem(state, action) {
      const id = action.payload;

      const item = state.cartItems.find(
        (product) => product.id === id
      );

      if (item) {
        state.totalQuantity -= item.quantity;

        state.cartItems = state.cartItems.filter(
          (product) => product.id !== id
        );

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
