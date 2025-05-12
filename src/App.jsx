import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthContext";
import { CafeProvider } from "./components/CafeContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CafeProvider>
            <Header />
            <Pages />
          </CafeProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
