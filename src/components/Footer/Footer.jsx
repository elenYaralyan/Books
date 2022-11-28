import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseLimit, getGenresAsync } from "../../store/features/genreSlice";
import "./style.scss";

const genres = [
  "Science Fiction",
  "Dystopian",
  "Adventure",
  "Mystery",
  "Horror",
  "Historical Fiction",
  "Romance",
  "Young Adult",
  "Children",
  "Autobiography",
  "Food",
  "Art",
  "History",
  "Travel",
  "Humor",
  "Religion ",
  "Social Sciences",
  "Parenting",
  "Science",
];

const API_URl = "https://openlibrary.org/subjects/";

function Footer() {
  const [genre, setGenre] = useState("");
  const { limit } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  const getGenre = (e) => {
    const name = e.target.innerText.toLowerCase().split(" ").join("_");
    e.target && setGenre(name);
    dispatch(decreaseLimit());
  };

  useEffect(() => {
    genre && dispatch(getGenresAsync(`${API_URl}${genre}.json?limit=${limit}`));
  }, [dispatch, genre, limit]);

  return (
    <div className="footer">
      <h3 className="genres">Popular Book Genres </h3>
      {genres.map((item, index) => (
        <div key={index}>
          <Link to={"subject"} className="subject">
            <h4 className="genre-list" onClick={(e) => getGenre(e)}>
              {item}
            </h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default Footer;
