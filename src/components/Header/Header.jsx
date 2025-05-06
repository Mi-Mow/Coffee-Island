import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logo-lg.svg";
import earth from "../../assets/earth-white.svg";

function Header() {
  return (
    <div>
      <header>
        <NavLink to={"/"} className={s.logo}>
          <img src={logo} alt="" />
        </NavLink>
        <nav>
          <div className={s.navLink}>
            <NavLink
              to={"/#map"}
              className={s.navItem}
            >
              地圖
            </NavLink>
            <NavLink
              to={"/news"}
              className={({ isActive }) =>
                isActive ? `${s.navItem} ${s.active}` : s.navItem
              }
            >
              島嶼月報
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive ? `${s.navItem} ${s.active}` : s.navItem
              }
            >
              限定商品
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? `${s.navItem} ${s.active}` : s.navItem
              }
            >
              關於我們
            </NavLink>
          </div>
          <div className={s.btnContainer}>
            <div className={s.earthContainer}>
              <img src={earth} alt="" />
              <p>EN</p>
            </div>
            <NavLink to={"/login"}>
              <button className={s.loginBtn}>登入</button>
            </NavLink>
            <NavLink to={"/register"}>
              <button className={s.registerBtn}>加入我們</button>
            </NavLink>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
