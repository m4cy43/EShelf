import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [
    {
      uuid: "",
      number: 0,
      title: "",
      year: 0,
      section: {
        uuid: "",
        sectionName: "",
      },
      authors: [
        {
          uuid: "",
          name: "",
          surname: "",
          middlename: "",
        },
      ],
      genres: [
        {
          uuid: "",
          genreName: "",
        },
      ],
    },
  ],
  book: {
    uuid: "",
    number: 0,
    title: "",
    year: 0,
    section: {
      uuid: "",
      sectionName: "",
    },
    authors: [
      {
        uuid: "",
        name: "",
        surname: "",
        middlename: "",
      },
    ],
    genres: [
      {
        uuid: "",
        genreName: "",
      },
    ],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (_, thunkAPI) => {
    try {
      return await bookService.getAllBooks();
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

export const simpleFind = createAsyncThunk(
  "books/simpleFind",
  async (query, thunkAPI) => {
    try {
      return await bookService.simpleFind(query);
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

export const advancedFind = createAsyncThunk(
  "books/advancedFind",
  async (query, thunkAPI) => {
    try {
      return await bookService.advancedFind(query);
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

export const oneBook = createAsyncThunk(
  "books/oneBook",
  async (query, thunkAPI) => {
    try {
      return await bookService.oneBook(query);
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

export const getAuthorBooks = createAsyncThunk(
  "books/getAuthorBooks",
  async (query, thunkAPI) => {
    try {
      return await bookService.getAuthorBooks(query);
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

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.deleteBook(query, token);
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

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetBooks: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(simpleFind.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(simpleFind.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(simpleFind.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(advancedFind.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(advancedFind.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(advancedFind.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(oneBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(oneBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = action.payload;
      })
      .addCase(oneBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAuthorBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthorBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAuthorBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.book = initialState.book;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBooks } = bookSlice.actions;
export default bookSlice.reducer;
