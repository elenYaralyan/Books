import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: [],
  loading: false,
  status: "",
};

export const getSearchedBooksAsync = createAsyncThunk(
  "search/getSearchedBooksAsync",
  async ({ API_URL, info, num }) => {
    const response = await fetch(`${API_URL}${info}&page=${num}`);
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

const pending = (state) => {
  state.status = "loading";
  state.loading = true;
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    removeData: (state) => {
      state.loading = false;
      state.status = "";
      state.result = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedBooksAsync.pending, pending)
      .addCase(getSearchedBooksAsync.fulfilled, (state, action) => {
        state.status = "resolved";
        state.loading = false;
        state.result.push(action.payload);
      })
      .addCase(getSearchedBooksAsync.rejected, setErr);
  },
});

export const { removeData } = searchSlice.actions;
export default searchSlice.reducer;
