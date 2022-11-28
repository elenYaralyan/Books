import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { responsive } from "../../assets/style/stylejs";
import img from "../../assets/images/images.png";
import {
  clearState,
  getTrendingBooksAsync,
} from "../../store/features/mainSlice";
import "./style.scss";
import { Link } from "react-router-dom";

const API_URL = "https://openlibrary.org/trending/daily.json?limit=";

const limit = 10;

function Slide() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const clearData = () => {
    dispatch(clearState());
  };

  useEffect(() => {
    dispatch(getTrendingBooksAsync({ API_URL, limit }));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Carousel
        responsive={responsive}
        arrows={false}
        autoPlay
        autoPlaySpeed={4000}
        infinite
        pauseOnHover
      >
        {(books.data &&
          books.data.map((book) =>
            book.works.map((elem) => (
              <div className="slide-elem" key={elem.key}>
                <img
                  src={
                    elem.cover_i
                      ? `https://covers.openlibrary.org/b/id/${elem.cover_i}-M.jpg`
                      : img
                  }
                  alt="book-cover"
                  className="img"
                />
                <h4 className="info">{elem.title}</h4>
                <h4 className="info">{elem.author_name}</h4>
              </div>
            ))
          )) || <></>}
      </Carousel>
      <div className="books">
        <Link to={"tending"} className="trending" onClick={clearData}>
          <h1 className="trend">Trending now</h1>
        </Link>
        <span className="quote">
          “The world is a book and those who do not travel read only one page.”
          ― St. Augustine
        </span>
      </div>
    </div>
  );
}
export default Slide;
