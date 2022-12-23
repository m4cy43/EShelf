import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import bookReducer from "../features/book/bookSlice";
import debtReducer from "../features/debt/debtSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    debts: debtReducer,
  },
});
