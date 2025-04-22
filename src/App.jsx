import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Pages from "./pages/Pages";
import Header from "./components/Header/Header";
import News from "./pages/News/News";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default App;
