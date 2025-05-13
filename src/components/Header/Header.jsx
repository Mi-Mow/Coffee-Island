import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logo-lg.svg";
import earth from "../../assets/header/earth-white.svg";
import cart from "../../assets/header/cart.svg";
import profile from "../../assets/header/profile.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { i18n, t } = useTranslation();
  const toggleLang = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "zh-TW" ? "en" : "zh-TW";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  const nextLang = i18n.language === "zh-TW" ? "EN" : "繁中";
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  const { isLoggedIn } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1140);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1140);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <header>
        <NavLink to={"/"} className={s.logo}>
          <img src={logo} alt="" />
        </NavLink>
        <nav>
          {isMobile ? (
            <>
            <div className={s.hamburger}>
              <div className={s.hamburgerContainer}>
                <img src="/hamburger.svg" alt="" />
              </div>
            </div>
            </>
          ) : (
            <>
              <div className={s.navLink}>
                <NavLink to={"/#map"} className={s.navItem}>
                  {t(`header.map`)}
                </NavLink>
                <NavLink
                  to={"/news"}
                  className={({ isActive }) =>
                    isActive ? `${s.navItem} ${s.active}` : s.navItem
                  }
                >
                  {t(`header.news`)}
                </NavLink>
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    isActive ? `${s.navItem} ${s.active}` : s.navItem
                  }
                >
                  {t(`header.products`)}
                </NavLink>
                <NavLink
                  to={"/about"}
                  className={({ isActive }) =>
                    isActive ? `${s.navItem} ${s.active}` : s.navItem
                  }
                >
                  {t(`header.about`)}
                </NavLink>
              </div>
              <div className={s.btnContainer}>
                <div className={s.language} onClick={toggleLang}>
                  <div className={s.earthContainer}>
                    <img src={earth} alt="" />
                  </div>
                  <p>{nextLang}</p>
                </div>
                {isLoggedIn ? (
                  <>
                    <NavLink to={"/cart"}>
                      <div className={s.cartContainer}>
                        <img src={cart} alt="" />
                      </div>
                    </NavLink>
                    <NavLink to={"/profile"}>
                      <div className={s.profileContainer}>
                        <img src={profile} alt="" />
                      </div>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to={"/login"}>
                      <button className={s.loginBtn}>
                        {t(`header.login`)}
                      </button>
                    </NavLink>
                    <NavLink to={"/register"}>
                      <button className={s.registerBtn}>
                        {t(`header.register`)}
                      </button>
                    </NavLink>
                  </>
                )}
              </div>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
