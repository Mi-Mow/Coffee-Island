import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import News from "./News/News";
import Products from "./Products/Products";
import About from "./About/About";
import Article from "./News/Article";
import ArticlePage from "./News/ArticlePage";
import Event from "./News/Event";
import EventPage from "./News/EventPage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import District from "./Map/District/District";
import ProductPage from "./Products/ProductsPage";
import CartPage from "./Products/CartPage";
import Profile from "./Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Cafe from "./Map/Cafe/Cafe";
const base = import.meta.env.BASE_URL;

function Pages() {
  return (
    <>
      <Routes>
        <Route path={`${base}`} element={<Home />} />
        <Route path={`${base}#map`} element={<Map />} />
        <Route path={`${base}map/:district`} element={<District />} />
        <Route path={`${base}map/:district/cafe/:id`} element={<Cafe />} />
        <Route path={`${base}news`} element={<News />} />
        <Route path={`${base}news/article`} element={<Article />} />
        <Route path={`${base}news/article/:id`} element={<ArticlePage />} />
        <Route path={`${base}news/event`} element={<Event />} />
        <Route path={`${base}news/event/:id`} element={<EventPage />} />
        <Route path={`${base}products`} element={<Products />} />
        <Route path={`${base}products/:id`} element={<ProductPage />} />
        <Route path={`${base}about`} element={<About />} />
        <Route path={`${base}login`} element={<Login />} />
        <Route path={`${base}register`} element={<Register />} />
        <Route
          path={`${base}cart`}
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${base}profile`}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Pages;
