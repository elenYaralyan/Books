import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookDetails: [],
  loading: false,
  status: "",
};

export const getBookDetailsAsync = createAsyncThunk(
  "oneBook/getBookDetailsAsync",
  async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const data = response.json();
      return data;
    }
    throw new Error("Sorry something went wrong");
  }
);

const setErr = (state) => {
  state.status = "rejected";
  state.loading = false;
};

const pending = (state) => {
  state.status = "loading";
  state.loading = true;
};

const bookSlice = createSlice({
  name: "oneBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookDetailsAsync.pending, pending)
      .addCase(getBookDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "resolved";
        state.bookDetails = [action.payload];
      })
      .addCase(getBookDetailsAsync.rejected, setErr);
  },
});

export const {} = bookSlice.actions;
export default bookSlice.reducer;
