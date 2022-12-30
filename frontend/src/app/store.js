import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import bookReducer from "../features/book/bookSlice";
import debtReducer from "../features/debt/debtSlice";
import addReducer from "../features/additional/addSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    debts: debtReducer,
    add: addReducer,
    user: userReducer,
  },
});
