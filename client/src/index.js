import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleColorMode from "./context/ThemeContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleColorMode>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToggleColorMode>
  </React.StrictMode>
);
