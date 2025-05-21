import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logo-lg.svg";
import earth from "../../assets/header/earth-white.svg";
import cart from "../../assets/header/cart.svg";
import profile from "../../assets/header/profile.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { language, changeLanguage } = useLanguage();

  const toggleLang = () => {
    changeLanguage(language === 'zh-TW' ? 'en' : 'zh-TW');
  }
  const { t } = useTranslation();
  const nextLang = language === "zh-TW" ? "EN" : "繁中";
  // const toggleLang = () => {
  //   const currentLang = i18n.language;
  //   const newLang = currentLang === "zh-TW" ? "en" : "zh-TW";
  //   i18n.changeLanguage(newLang);
  //   localStorage.setItem("lang", newLang);
  // };
  // const nextLang = i18n.language === "zh-TW" ? "EN" : "繁中";
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  const { isLoggedIn } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1140);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <div className={s.hamburger} onClick={() => setIsMenuOpen(true)}>
                <div className={s.hamburgerContainer}>
                  <img src="/hamburger.svg" alt="" />
                </div>
              </div>
              {isMenuOpen && (
                <>
                  <div className={s.menuDimmer}></div>

                  <div className={s.hamburgerOverlay}>
                    <button className={s.closeBtn} onClick={() => setIsMenuOpen(false)}>
                      ×
                    </button>

                    {isLoggedIn ? (
                      <>
                        <ul className={s.menuList}>
                          <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>主頁</NavLink></li>
                          <li><NavLink to="/#map" onClick={() => setIsMenuOpen(false)}>地圖</NavLink></li>
                          <li><NavLink to="/news" onClick={() => setIsMenuOpen(false)}>島嶼月報</NavLink></li>
                          <li><NavLink to="/products" onClick={() => setIsMenuOpen(false)}>限定商品</NavLink></li>
                          <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>關於我們</NavLink></li>
                          <li><NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>購物車</NavLink></li>
                        </ul>

                        <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className={s.memberButton}>
                          會員中心
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <ul className={s.menuList}>
                          <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>主頁</NavLink></li>
                          <li><NavLink to="/#map" onClick={() => setIsMenuOpen(false)}>地圖</NavLink></li>
                          <li><NavLink to="/news" onClick={() => setIsMenuOpen(false)}>島嶼月報</NavLink></li>
                          <li><NavLink to="/products" onClick={() => setIsMenuOpen(false)}>限定商品</NavLink></li>
                          <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>關於我們</NavLink></li>
                        </ul>

                        <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className={s.memberButton}>
                          會員登入
                        </NavLink>
                      </>
                    )}
                  </div>
                </>
              )}
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