import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { CafeProvider } from "./components/CafeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <CafeProvider>
              <Header />
              <Pages />
            </CafeProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
