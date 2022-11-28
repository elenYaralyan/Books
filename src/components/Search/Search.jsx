import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getSearchedBooksAsync,
  removeData,
} from "../../store/features/searchSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Books from "../Books/Books";
import "./style.scss";

const API_URL = "https://openlibrary.org/search.json?limit=20&title=";

function Search() {
  const [info, setInfo] = useState("");
  const [num, setNum] = useState(1);
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.search);

  const changeInfo = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const elem = e.target.value.toLowerCase().trim().split(" ").join("+");
      if (info !== elem) {
        dispatch(removeData());
        setNum(1);
      }
      setInfo(elem);
      e.target.value = "";
    }
  };

  useEffect(() => {
    info && dispatch(getSearchedBooksAsync({ API_URL, info, num }));
  }, [num, info, dispatch]);

  const loadMore = () => {
    setNum((num) => num + 1);
  };

  return (
    <div className="load-books">
      <div className="search-bar">
        <h2 className="quote">
          "If you don’t like to read, you haven’t found the right book." – J.K.
          Rowling
        </h2>
        <input
          type="text"
          className="text"
          onKeyDown={changeInfo}
          placeholder="Find books that you like"
        />
      </div>
      <div className="book-list">
        <h1 className="list">Discover Books You'll Love</h1>
        {allData.loading && num === 1 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 20,
            }}
          >
            <CircularProgress
              size={"90px"}
              sx={{
                color: "#4d4325",
              }}
            />
          </Box>
        ) : (
          info && (
            <>
              <Books />
              <button onClick={loadMore} className="load-more">
                Load more
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
}
export default Search;
