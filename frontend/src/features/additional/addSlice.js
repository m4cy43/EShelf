import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addService from "./addService";

const initialState = {
  authors: [{ uuid: "", name: "", surname: "", middlename: "" }],
  genres: [{ uuid: "", genreName: "" }],
  sections: [{ uuid: "", sectionName: "" }],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllAuthors = createAsyncThunk(
  "add/getAllAuthors",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.getAllAuthors(token);
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

export const getAllGenres = createAsyncThunk(
  "add/getAllGenres",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.getAllGenres(token);
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

export const getAllSections = createAsyncThunk(
  "add/getAllSections",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.getAllSections(token);
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

export const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    resetAdd: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authors = action.payload;
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllGenres.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.genres = action.payload;
      })
      .addCase(getAllGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sections = action.payload;
      })
      .addCase(getAllSections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdd } = addSlice.actions;
export default addSlice.reducer;
