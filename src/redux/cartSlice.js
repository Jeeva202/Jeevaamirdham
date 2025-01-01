import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    isCartOpen: false,
    isLoginOpen:false
  },
  reducers: {
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false; 
    },
    openLogin:(state) =>{
      state.isLoginOpen = true
    },
    closeLogin:(state) =>{
      state.isLoginOpen = false
    },
  },
});

export const { openCart, closeCart, openLogin, closeLogin } = cartReducer.actions;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectIsLoginOpen = (state) => state.cart.isLoginOpen
export default cartReducer.reducer;
