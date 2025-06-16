import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logo-lg.svg";
import earth from "../../assets/header/earth-white.svg";
import earthPixel from "../../assets/header/earth-pixel.svg";
import cart from "../../assets/header/cart.svg";
import profile from "../../assets/header/profile.svg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
const base = import.meta.env.BASE_URL;

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

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1140);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 購物車數量狀態與監聽
  const [cartCount, setCartCount] = useState(() => {
    try {
      const items = JSON.parse(localStorage.getItem("cartItems")) || [];
      return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    } catch {
      return 0;
    }
  });

  // 這邊是漢堡選單(by怡璇)
  const { logout } = useAuth(); // ✅ 從 context 引入

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    {
      name: "home",
      path: `${base}`,
      icon: "ham_home.png",
      hover: "ham_home_hover.png",
    },
    {
      name: "map",
      path: `${base}#map`,
      icon: "ham_map.png",
      hover: "ham_map_hover.png",
    },
    {
      name: "news",
      path: `${base}news`,
      icon: "ham_news.png",
      hover: "ham_news_hover.png",
    },
    {
      name: "products",
      path: `${base}products`,
      icon: "ham_prod.png",
      hover: "ham_prod_hover.png",
    },
    {
      name: "about",
      path: `${base}about`,
      icon: "ham_about.png",
      hover: "ham_about_hover.png",
    },
    ...(isLoggedIn
      ? [
        {
          name: "cart",
          path: `${base}cart`,
          icon: "ham_cart.png",
          hover: "ham_cart_hover.png",
        },
      ]
      : []),
  ];

  useEffect(() => {
    const updateCartCount = (e) => {
      if (e?.detail !== undefined) {
        setCartCount(e.detail);
      } else {
        try {
          const items = JSON.parse(localStorage.getItem("cartItems")) || [];
          const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
          setCartCount(total);
        } catch {
          setCartCount(0);
        }
      }
    };

    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1140);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div>
      <header>
        <NavLink to={`${base}`} className={s.logo}>
          <img src={logo} alt="" />
        </NavLink>
        {/* 這邊是RWD漢堡選單的地方(by怡璇) */}
        <nav>
          {isMobile ? (
            <>
              <div className={s.hamburger} onClick={() => setIsMenuOpen(true)}>
                <div className={s.hamburgerContainer}>
                  <img src={`${base}hamburger.svg`} alt="" />
                </div>
              </div>

              {isMenuOpen && (
                <>
                  <div className={s.menuDimmer}></div>
                  <div className={s.hamburgerOverlay}>
                    <button className={s.closeBtn} onClick={() => setIsMenuOpen(false)}>×</button>

                    <ul className={s.menuList}>
                      {navItems.map((item, index) => (
                        <li key={index}>
                          <NavLink
                            to={item.path}
                            end
                            onClick={() => setIsMenuOpen(false)}
                            className={s.menuLink}
                          >
                            {({ isActive }) => (
                              <>
                                <img
                                  src={`${base}${isActive ? item.hover : item.icon}`}
                                  alt={item.name}
                                  className={s.icon}
                                />
                                <span className={isActive ? s.activeText : undefined}>
                                  {t(`header.${item.name}`)}
                                </span>

                              </>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>

                    {/* 🌐 語言切換區塊 */}
                    <div className={s.language} onClick={toggleLang}>
                      <div className={s.earthContainer}>
                        <img src={earthPixel} alt="language" />
                      </div>
                      <p>{nextLang}</p>
                    </div>

                    {/* 👤 會員功能區 */}
                    {isLoggedIn ? (
                      <>
                        <NavLink
                          to={`${base}profile`}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) => 
                          isActive ? `${s.memberButton} ${s.active}` : s.memberButton
                        }
                        >
                          {t("header.profile")}
                        </NavLink>

                        <button
                          className={s.logoutButton}
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                          }}
                        >
                          {t("header.logout")}
                        </button>
                      </>
                    ) : (
                      <NavLink
                        to={`${base}login`}
                        onClick={() => setIsMenuOpen(false)}
                        className={s.memberButton}
                      >
                        {t("header.login")}
                      </NavLink>
                    )}

                    {/* <NavLink
                      to={`${base}login`}
                      onClick={() => setIsMenuOpen(false)}
                      className={s.memberButton}
                    >
                    </NavLink> */}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className={s.navLink}>
                <NavLink to={`${base}#map`} className={s.navItem}>
                  {t(`header.map`)}
                </NavLink>
                <NavLink
                  to={`${base}news`}
                  className={({ isActive }) =>
                    isActive ? `${s.navItem} ${s.active}` : s.navItem
                  }
                >
                  {t(`header.news`)}
                </NavLink>
                <NavLink
                  to={`${base}products`}
                  className={({ isActive }) =>
                    isActive ? `${s.navItem} ${s.active}` : s.navItem
                  }
                >
                  {t(`header.products`)}
                </NavLink>
                <NavLink
                  to={`${base}about`}
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
                    <NavLink to={`${base}cart`}>
                      <div className={`cartContainer ${s.cartContainer}`}>
                        <img src={cart} alt="" />
                        {cartCount > 0 && <span className={s.cartCount}>{cartCount}</span>}
                      </div>
                    </NavLink>

                    <NavLink to={`${base}profile`}>
                      <div className={s.profileContainer}>
                        <img src={profile} alt="" />
                      </div>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to={`${base}login`}>
                      <button className={s.loginBtn}>{t(`header.login`)}</button>
                    </NavLink>
                    <NavLink to={`${base}register`}>
                      <button className={s.registerBtn}>{t(`header.register`)}</button>
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
