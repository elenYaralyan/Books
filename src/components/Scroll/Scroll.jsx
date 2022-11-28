import { useEffect, useState } from "react";
import "./style.scss";

function Scroll() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showTopBtn && (
        <button className="goTop" onClick={goToTop}>
          &#8743;
        </button>
      )}
    </>
  );
}
export default Scroll;
