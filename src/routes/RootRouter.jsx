import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Book from "../pages/Book";
import GenrePage from "../pages/GenrePage";
import Home from "../pages/Home";
import SearchBook from "../pages/SearchBook";
import TrendBook from "../pages/TendBook";
import Trending from "../pages/Trending";

function RootRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:key" element={<SearchBook />} />
          <Route path="subject" element={<GenrePage />} />
          <Route path="/subject/:key" element={<Book />} />
          <Route path="tending" element={<Trending />} />
          <Route path="/trending/:key" element={<TrendBook />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}
export default RootRouter;
