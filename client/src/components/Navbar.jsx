import { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Button,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material/";
import Logo from "../assets/logo/logo.png";
import LoginRegModal from "../components/LoginRegister/LoginRegModal";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Search/Searchbar";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // get user that is logged in
  const { user, dispatch } = useContext(AuthContext);

  //declaring variables (Color Mode)
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // searchbar visibility & css animation
  const [isSearchbarVisible, setSearchbarVisible] = useState(false);

  // use navigate to navigate to other routes
  const navigate = useNavigate();

  const toggleSearchbar = () => {
    setSearchbarVisible(!isSearchbarVisible);
  };

  //useState => handling open & close of Login/Register Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    fetch(`${process.env.REACT_APP_SERVER_URL}/trainer/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  // Check if it's mobile view
  const isMobileView = useMediaQuery("(max-width: 600px");

  //handling open & close of Menu (for Mobile View)
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" /* width="100%" */>
        <Toolbar>
          <Avatar
            alt="Logo"
            src={Logo}
            sx={{ width: "80px", height: "80px" }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: isMobileView ? "center" : "space-between",
              alignItems: "center",
            }}
          >
            {isMobileView ? (
              <>
                <Button
                  variant="outlined"
                  aria-controls={openMenu ? "menu-Menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} to="/search">
                    Search
                  </MenuItem>
                  <MenuItem component={Link} to="/user">
                    User
                  </MenuItem>
                  <MenuItem component={Link} to="/trainer">
                    Trainer
                  </MenuItem>
                  <MenuItem component={Link} to="/course">
                    Course
                  </MenuItem>
                  {user?.trainer && (
                    <MenuItem component={Link} to="/course/create">
                      Create Course
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box>
                <Button component={Link} to="/user">
                  my profile
                </Button>
                <Button component={Link} to="/trainer">
                  Trainer
                </Button>
                <Button component={Link} to="/course">
                  Course
                </Button>
                {user?.trainer && (
                  <Button component={Link} to="/course/create">
                    Create Course
                  </Button>
                )}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: isMobileView ? "60%" : "40%",
              }}
            >
              <Box
                sx={{
                  width: isSearchbarVisible ? "60%" : "0",
                  overflow: "hidden",
                  transition: "width 0.3s ease-out",
                }}
              >
                <Searchbar />
              </Box>
              <Box>
                {!isMobileView && (
                  <IconButton color="inherit" onClick={toggleSearchbar}>
                    <SearchIcon />
                  </IconButton>
                )}
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
                {!user && (
                  <>
                    {isMobileView ? (
                      <Button variant="contained" onClick={handleOpen}>
                        <LoginIcon />
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleOpen}>
                        Login/Register
                      </Button>
                    )}
                  </>
                )}
                {user && (
                  <>
                    {isMobileView ? (
                      <Button variant="contained" onClick={handleLogout}>
                        <LogoutIcon />
                      </Button>
                    ) : (
                      <Button variant="contained" onClick={handleLogout}>
                        Logout
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {!user && <LoginRegModal open={open} close={handleClose} />}
    </>
  );
};

export default Navbar;
