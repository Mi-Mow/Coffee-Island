import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import "./i18n.js";
import { CafeProvider } from "./components/CafeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CafeProvider> */}
      <App />
    {/* </CafeProvider> */}
  </StrictMode>
);
