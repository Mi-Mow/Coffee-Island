import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logo-lg.svg";
import earth from "../../assets/earth-white.svg";
import { useTranslation } from "react-i18next";

function Header() {
  const { i18n, t } = useTranslation();
  const toggleLang = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "zh-TW" ? "en" : "zh-TW";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  const nextLang = i18n.language === "zh-TW" ? "繁中" : "EN";

  return (
    <div>
      <header>
        <NavLink to={"/"} className={s.logo}>
          <img src={logo} alt="" />
        </NavLink>
        <nav>
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
            <NavLink to={"/login"}>
              <button className={s.loginBtn}>{t(`header.login`)}</button>
            </NavLink>
            <NavLink to={"/register"}>
              <button className={s.registerBtn}>{t(`header.register`)}</button>
            </NavLink>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
