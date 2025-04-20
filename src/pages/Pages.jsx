import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Map from "./Map";
import Monthly from './Monthly'
import Products from './Products'
import About from './About'

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/monthly" element={<Monthly />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default Pages;
