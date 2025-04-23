import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Map from "./Map/Map";
import Monthly from './Monthly/Monthly'
import Products from './Products/Products'
import About from './About/About'
import ProductPage from "./Products/ProductsPage";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/monthly" element={<Monthly />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default Pages;
