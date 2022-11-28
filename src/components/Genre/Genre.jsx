import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import img from "../../assets/images/broken.png";
import { addLimit } from "../../store/features/genreSlice";
import "./style.scss";

function Genre() {
  const allData = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const { genres } = allData;

  const changeLimit = () => {
    dispatch(addLimit());
  };

  return (
    <div className="subject-wrapper">
      {allData.loading && allData.limit === 20 ? (
        <Box className="box">
          <CircularProgress
            size={"90px"}
            sx={{
              color: "#4d4325",
            }}
          />
        </Box>
      ) : (
        allData &&
        genres.map((elem) => (
          <React.Fragment key={elem.key}>
            <h2 className="subject-name">{elem.name.toUpperCase()}</h2>
            {elem.works.map((item) => (
              <Link
                to={`/subject/${item.key.replace("/works/", "")}`}
                key={item.key}
                className="link"
              >
                <img
                  src={
                    item.cover_id
                      ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
                      : img
                  }
                  alt="book-cover"
                />
                <p><b>Title:</b> {item.title}</p>
                <p><b>Author:</b>{item.authors[0].name}</p>
              </Link>
            ))}
          </React.Fragment>
        ))
      )}

      <button className="load" onClick={changeLimit}>
        Load more
      </button>
    </div>
  );
}
export default Genre;
