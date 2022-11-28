import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Scroll from "./Scroll/Scroll";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Scroll />
      <Footer />
    </>
  );
}
export default Layout;
