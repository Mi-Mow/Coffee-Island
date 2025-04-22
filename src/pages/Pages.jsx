import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Map from "./Map/Map";
import News from './News/News'
import Products from './Products/Products'
import About from './About/About'


function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default Pages;
