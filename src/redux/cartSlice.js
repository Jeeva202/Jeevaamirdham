import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    isCartOpen: false,
    isLoginOpen: false,
    isAdminLoggedIn: false,
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
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload; // Set user login state based on action
    },
    setAdminLoggedIn: (state, action) => {
      state.isAdminLoggedIn = action.payload; // Set admin login state based on action
    },
  },
});

export const { 
  openCart, 
  closeCart, 
  openLogin, 
  closeLogin, 
  setUserLoggedIn, 
  setAdminLoggedIn 
} = cartReducer.actions;

export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectIsLoginOpen = (state) => state.cart.isLoginOpen;
export const selectIsUserLoggedIn = (state) => state.cart.isUserLoggedIn;
export const selectIsAdminLoggedIn = (state) => state.cart.isAdminLoggedIn;
export default cartReducer.reducer;
