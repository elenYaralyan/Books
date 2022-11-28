import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  status: "",
  limit: 10,
};

export const getTrendingBooksAsync = createAsyncThunk(
  "books/getTrendingBooksAsync",
  async ({ API_URL, limit }) => {
    const response = await fetch(`${API_URL}${limit}`);
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

const mainSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = "resolved";
      state.loading = false;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingBooksAsync.pending, pending)
      .addCase(getTrendingBooksAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(getTrendingBooksAsync.rejected, setErr);
  },
});

export const { clearState } = mainSlice.actions;
export default mainSlice.reducer;
