import { createContext, useState, useMemo } from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";


export const ColorModeContext = createContext({toggleColorMode: () => {} });

export default function ToggleColorMode({children}) {
    const [mode, setMode] = useState('dark');
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
        },
      }),
      [],
    );
  
    let theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode,
            ...(mode === 'dark' 
            ? {
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
            } : {
              primary: {
                main: "#00FF09"
              },
            })
          },
        }),
      [mode],
    );

    theme = responsiveFontSizes(theme);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }