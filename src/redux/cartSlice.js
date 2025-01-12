import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    isCartOpen: false,
    isLoginOpen:false,
    userId: null,
    cartDetails: [],
    booksData: [],
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
    setUserId: (state, action) => {
      state.userId = action.payload; // Set userId in the state
    },
    clearUserId: (state) => {
      state.userId = null; // Clear userId when user logs out or for any other reason
    },
    setCartDetails: (state, action) => {
      state.cartDetails = action.payload; // Set cart details (fetched from backend)
    },
    addToCart: (state, action) => {
      const { book_id, quantity } = action.payload;
      
      // Check if the item already exists in the cart
      const existingItemIndex = state.cartDetails.findIndex(item => item.book_id === book_id);

      if (existingItemIndex >= 0) {
        // If the item already exists, update its quantity
        state.cartDetails[existingItemIndex].quantity += quantity;
      } else {
        // If it's a new item, add it to the cart
        state.cartDetails.push({ book_id, quantity });
      }
    },
    updateQuantity: (state, action) => {
      const { book_id, quantity } = action.payload;
      // Find the item in the cart and update its quantity
      const itemIndex = state.cartDetails.findIndex(item => item.book_id === book_id);
      if (itemIndex >= 0) {
        state.cartDetails[itemIndex].quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { book_id } = action.payload;
      // Remove item from the cart based on the book_id
      state.cartDetails = state.cartDetails.filter(item => item.book_id !== book_id);
    },
    clearCart: (state) => {
      state.cartDetails = []; // Clear the cart
    },
    setBooksData: (state, action) => {
      state.booksData = action.payload; // Store booksData in Redux
    },
    setAdminLoggedIn: (state, action) => {
      state.isAdminLoggedIn = action.payload; // Set admin login state based on action
    },
  },
});

export const { openCart, closeCart, openLogin, closeLogin, setUserLoggedIn,setUserId, clearUserId, setCartDetails,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart, setBooksData, setAdminLoggedIn} = cartReducer.actions;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectIsLoginOpen = (state) => state.cart.isLoginOpen;
export const selectIsUserLoggedIn = (state) => state.cart.isUserLoggedIn;
export const selectUserId = (state) => state.cart.userId; 
export const selectCartDetails = (state) => state.cart.cartDetails;
export const selectBooksData = (state) => state.cart.booksData;
export const selectCartTotal = (state) => {
  return state.cart.cartDetails.reduce((total, item) => total + item.quantity * item.price, 0); // Assuming price is included in the cart item
};
export const selectIsAdminLoggedIn = (state) => state.cart.isAdminLoggedIn;
export default cartReducer.reducer;