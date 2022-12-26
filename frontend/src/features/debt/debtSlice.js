import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import debtService from "./debtService";

const initialState = {
  debts: {
    user: [
      {
        uuid: "",
        email: "",
        name: "",
        surname: "",
        phone: "",
        books: [
          {
            uuid: "",
            title: "",
            year: 0,
            authors: [
              {
                uuid: "",
                name: "",
                surname: "",
                middlename: "",
              },
            ],
            debt: {
              uuid: "",
              isBooked: false,
              isDebted: "",
              deadlineDate: "",
            },
          },
        ],
      },
    ],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllDebts = createAsyncThunk(
  "debts/getAllDebts",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await debtService.getAllDebts(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const oneBookDebt = createAsyncThunk(
  "debts/oneBookDebt",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await debtService.oneBookDebt(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookTheBook = createAsyncThunk(
  "debts/bookTheBook",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await debtService.bookTheBook(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unbookTheBook = createAsyncThunk(
  "debts/unbookTheBook",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await debtService.unbookTheBook(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBoth = createAsyncThunk(
  "debts/getBoth",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await debtService.getBoth(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const debtSlice = createSlice({
  name: "debts",
  initialState,
  reducers: {
    resetDebts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDebts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDebts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debts = action.payload;
      })
      .addCase(getAllDebts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(oneBookDebt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneBookDebt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debts = action.payload;
      })
      .addCase(oneBookDebt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(bookTheBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookTheBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debts = action.payload;
      })
      .addCase(bookTheBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unbookTheBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unbookTheBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debts = action.payload;
      })
      .addCase(unbookTheBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBoth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.debts = action.payload;
      })
      .addCase(getBoth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDebts } = debtSlice.actions;
export default debtSlice.reducer;
