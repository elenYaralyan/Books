import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTrendingBooksAsync } from "../../store/features/mainSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import img from "../../assets/images/broken.png";
import "./style.scss";

const API_URL = "https://openlibrary.org/trending/daily.json?limit=10&page=";

function Trend() {
  const [limit, setLimit] = useState(1);
  const trending = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { data } = trending;

  const addPage = () => {
    setLimit((limit) => limit + 1);
  };

  useEffect(() => {
    dispatch(getTrendingBooksAsync({ API_URL, limit }));
  }, [dispatch, limit]);

  return (
    <div className="trend-wrapper">
      <h2 className="trend">TRENDING NOW</h2>
      {trending.loading && limit === 1 ? (
        <Box className="box">
          <CircularProgress
            size={"90px"}
            sx={{
              color: "#4d4325",
            }}
          />
        </Box>
      ) : (
        data &&
        data.map((elem) =>
          elem.works.map((item) => (
            <Link
              to={`/${item.key.replace("/works/", "")}`}
              key={item.key}
              className="book-wrapper"
            >
              <img
                className="book-cover"
                src={
                  item.cover_i
                    ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                    : img
                }
                alt="book-cover"
              />
              <p><b>Title:</b> {item.title}</p>
              <p><b>Author:</b>{item.author_name}</p>
            </Link>
          ))
        )
      )}
      <button className="load" onClick={addPage}>
        Load more
      </button>
    </div>
  );
}
export default Trend;
