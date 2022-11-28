import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetailsAsync } from "../../store/features/bookSlice";
import img from "../../assets/images/broken.png";
import "./style.scss";

const API_URl = "https://openlibrary.org/works/";

function OneBook() {
  const { key } = useParams();
  const bookData = useSelector((state) => state.oneBook);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookDetailsAsync(`${API_URl}${key}.json`));
  }, [dispatch, key]);

  const { bookDetails } = bookData;

  const goBack = () => navigate(-1);

  return (
    <div className="container">
      {bookDetails.map((el) => (
        <div className="book-details" key={el.key}>
          <button onClick={goBack} className="btn-back">
            &#60;
          </button>
          <div className="img-wrapper">
            <img
              src={
                el.covers
                  ? `https://covers.openlibrary.org/b/id/${el.covers[0]}-M.jpg`
                  : img
              }
              alt="cover"
            />
          </div>
          <div className="text-wrapper">
            <h2>
              <b>Title: </b> {el.title}
            </h2>
            <h4>
              <b>First Publish date: </b> {el.first_publish_date || "-"}
            </h4>
            <p>
              <b> Description: </b>
              {el.description ? el.description.value : "no description"}
            </p>
            <span>
              <b>Characters: </b>
              {el.subject_people ? el.subject_people.join(", ") : "-"}
            </span>
            <span>
              <b>Genres: </b> {el.subjects ? el.subjects.join(", ") : "-"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default OneBook;
