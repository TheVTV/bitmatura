import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import "./index.css";
import App from "./App.tsx";

// Initialize Google Analytics 4
ReactGA.initialize("G-PD71HEBBBF");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
