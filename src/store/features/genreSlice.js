import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
  loading: false,
  status: "",
  limit: 20,
};

export const getGenresAsync = createAsyncThunk(
  "genre/getGenresAsync",
  async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Sorry something went wrong");
  }
);

const setErr = (state) => {
  state.status = "rejected";
  state.loading = false;
};

const pending = (state, action) => {
  state.status = "loading";
  state.loading = true;
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    addLimit: (state) => {
      state.limit = state.limit + 20;
    },
    decreaseLimit: (state) => {
      state.limit = 20;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenresAsync.pending, pending)
      .addCase(getGenresAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "resolved";
        state.genres = [action.payload];
      })
      .addCase(getGenresAsync, setErr);
  },
});

export const { addLimit, decreaseLimit } = genreSlice.actions;
export default genreSlice.reducer;
