import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    isCartOpen: false,
  },
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const { openCart, closeCart } = cartReducer.actions;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;

export default cartReducer.reducer;
