import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import SnackBar from "./SnackBarSlice";
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    snackbar: SnackBar,

  },
});