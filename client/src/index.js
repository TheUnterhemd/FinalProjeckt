import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import ToggleColorMode from "./context/ThemeContext.js";
import SearchProvider from "./context/SearchContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleColorMode>
      <CssBaseline />
      <SearchProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LocalizationProvider>
      </SearchProvider>
    </ToggleColorMode>
  </React.StrictMode>
);
