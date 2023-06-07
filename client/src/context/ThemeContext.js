import { createContext, useState, useMemo } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
    }),
    []
  );

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: {
                  main: "#5c9be5",
                },
                secondary: {
                  main: "#c73e9d",
                },
                text: {
                  primary: "#f5f5f5",
                  secondary: "#f5f5f5",
                },
                background: {
                  default: "#0a1d30",
                  paper: "#08437d",
                  navbar: "#145191",
                },
                error: {
                  main: "#e62f21",
                },
              }
            : {
                primary: {
                  main: "#103965",
                },
                secondary: {
                  main: "#ca4e9e",
                },
                background: {
                  default: "#eeeeee",
                  paper: "#419ec5",
                  navbar: "#276fc1",
                },
                text: {
                  primary: "#103965",
                  secondary: "#f5f5f5",
                },
                error: {
                  main: "#e62f21",
                },
              }),
        },
      }),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
