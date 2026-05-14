import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/** Vite: BASE_URL é "/" ou "/nome-repo/" no GitHub Pages */
function routerBasename() {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return undefined;
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
