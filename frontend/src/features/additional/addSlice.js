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

export const createAuthor = createAsyncThunk(
  "add/createAuthor",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.createAuthor(data, token);
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

export const createGenre = createAsyncThunk(
  "add/createGenre",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.createGenre(data, token);
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

export const createSection = createAsyncThunk(
  "add/createSection",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.createSection(data, token);
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

export const deleteAuthor = createAsyncThunk(
  "add/deleteAuthor",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.deleteAuthor(query, token);
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

export const deleteGenre = createAsyncThunk(
  "add/deleteGenre",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.deleteGenre(query, token);
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

export const deleteSection = createAsyncThunk(
  "add/deleteSection",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await addService.deleteSection(query, token);
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
      })
      .addCase(createAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGenre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGenre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createGenre.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAuthor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGenre.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdd } = addSlice.actions;
export default addSlice.reducer;
