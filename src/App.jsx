import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { CafeProvider } from "./components/CafeContext";
import { LanguageProvider } from "./context/LanguageContext";
import monster from "./assets/goUpMonster.svg";

function App() {
  const goUp = () => {
    window.scrollTo(0,0);
  }
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <CafeProvider>
              <Header />
              <Pages />
              <div className="monter-container" onClick={goUp}>
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
