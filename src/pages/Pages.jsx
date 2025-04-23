import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Map from "./Map/Map";
import Monthly from './Monthly/Monthly'
import Products from './Products/Products'
import About from './About/About'
import Login from "./Login/Login";
import Register from "./Register/Register";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/monthly" element={<Monthly />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default Pages;
