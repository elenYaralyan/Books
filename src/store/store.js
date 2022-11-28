import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import genreSlice from "./features/genreSlice";
import mainSlice from "./features/mainSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    books: mainSlice,
    search: searchSlice,
    genre: genreSlice,
    oneBook: bookSlice,
  },
});
