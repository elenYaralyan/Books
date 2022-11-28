import { Link } from "react-router-dom";
import book from "../../assets/images/book.png";
import "./style.scss";

function Header() {
  return (
    <div className="header">
      <Link to={"/"} className="link">
        <img src={book} alt="book" className="img" />
        <h1 className="title">Welcome to Booksy</h1>
      </Link>
    </div>
  );
}
export default Header;
