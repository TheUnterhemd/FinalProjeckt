import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
// color theme example from Material
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

//colorThemes
let theme = createTheme({
  palette: {
    primary: {
      main: "#f5f5f5",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#EBCBE5",
    },
    background: {
      default: "#0a1d30",
      paper: "#276fc1",
    },
  },
});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
