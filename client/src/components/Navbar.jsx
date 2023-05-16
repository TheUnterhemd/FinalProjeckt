import { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from '@mui/icons-material/Search';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Avatar, Box, IconButton } from "@mui/material/";
import Logo from "../assets/logo/logo.png";
import LoginRegModal from "../components/LoginRegister/LoginRegModal";
import { Link } from "react-router-dom";
import Searchbar from "./Search/Searchbar";

const Navbar = () => {
  //declaring variables (Color Mode)
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // searchbar visibility & css animation
  const [isSearchbarVisible, setSearchbarVisible] = useState(false);

  const toggleSearchbar = () => {
    setSearchbarVisible(!isSearchbarVisible);
  }

  //useState => handling open & close of Login/Register Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Logo"
            src={Logo}
            style={{ width: "80px", height: "80px" }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box>
              <Button component={Link} to="/user">
                User
              </Button>
              <Button component={Link} to="/trainer">
                Trainer
              </Button>
              <Button component={Link} to="/course">
                Course
              </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "40%" }}>

              <Box sx={{
                width: isSearchbarVisible ? "60%" : "0",
                overflow: "hidden",
                transition: "width 0.3s ease-out",
              }}>
                <Searchbar />
              </Box>
              <Box>
                <IconButton color="inherit" onClick={toggleSearchbar}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
                <Button variant="contained" onClick={handleOpen}>
                  Login/Register
                </Button>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginRegModal open={open} close={handleClose} />
    </>
  );
};

export default Navbar;
