import { NavLink } from "react-router-dom";
import "./Header.scss"
import logo from "../../assets/logo-v2.svg";
import earth from "../../assets/earth-white.svg";


function Header() {
  return (
    <div>
      <header>
        <NavLink to={"/"} className="logo">
          <img src={logo} alt="" />
        </NavLink>
        <nav>
          <div className="nav-link">
            <NavLink className="nav-item" to={"/map"}>地圖</NavLink>
            <NavLink className="nav-item" to={"/news"}>島嶼月報</NavLink>
            <NavLink className="nav-item" to={"/products"}>限定商品</NavLink>
            <NavLink className="nav-item" to={"/about"}>關於我們</NavLink>
          </div>
          <div className="btn-container">
            <div className="earth-container">
              <img src={earth} alt="" />
              <p>EN</p>
            </div>
            <NavLink to={"/login"} ><button className="login-btn">登入</button></NavLink>
            <NavLink to={"/register"} ><button className="register-btn">加入我們</button></NavLink>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
