import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from "../../assets/images/broken.png";
import "./style.scss";

function Books() {
  const info = useSelector((state) => state.search);
  const { result } = info;

  return (
    <div className="list-wrapper">
      {result &&
        result.map((el) =>
          el.docs.map((item) => (
            <Link
              to={`/${item.key.replace("/works/", "")}`}
              key={item.last_modified_i}
              className="wrappers"
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
              <p><b>Author:</b> {item.author_name}</p>
            </Link>
          ))
        )}
    </div>
  );
}
export default Books;
