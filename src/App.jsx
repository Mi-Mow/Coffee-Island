import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { CafeProvider } from "./components/CafeContext";
import { LanguageProvider } from "./context/LanguageContext";
import monster from "./assets/goUpMonster.svg";
import { useEffect, useState } from "react";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handelScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handelScroll);

    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);

  const goUp = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <CafeProvider>
              <Header />
              <Pages />
              <div
                className={`monster-container`}
                onClick={goUp}
              >
                <img src={monster} alt="" />
              </div>
            </CafeProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
