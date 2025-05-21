import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "zh-TW"
  );

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "lang") {
        setLanguage(e.newValue || "zh-TW");
        i18n.changeLanguage(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
