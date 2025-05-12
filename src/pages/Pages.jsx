import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import News from "./News/News";
import Products from "./Products/Products";
import About from "./About/About";
import Article from "./News/Article";
import ArticlePage from "./News/ArticlePage";
import Event from "./News/Event";
import EventPage from './News/EventPage'
import Login from "./Login/Login";
import Register from "./Register/Register";
import District from "./Map/District/District";
import ProductPage from "./Products/ProductsPage";
import CartPage from "./Products/CartPage";
import Profile from "./Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Cafe from "./Map/Cafe/Cafe";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/article" element={<Article />} />
        <Route path="/news/article/:id" element={<ArticlePage />} />
        <Route path="/news/event" element={<Event />} />
		<Route path="/news/event/:id" element={<EventPage/>} />
        <Route path="/map/:district" element={<District />} />
        <Route path="/map/:district/cafe/:id" element={<Cafe />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
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
