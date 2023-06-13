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
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "background.navbar" }}
        /* width="100%" */
      >
        <Toolbar>
          <Avatar
            alt="Logo"
            src={Logo}
            sx={{ width: "80px", height: "80px" }}
            component={Link}
            to="/"
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
                  aria-label="Menu"
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
                  <MenuItem
                    aria-label="search"
                    component={Link}
                    to="/search"
                    sx={{ color: "text.secondary" }}
                  >
                    Search
                  </MenuItem>
                  <MenuItem
                    aria-label="my profile"
                    component={Link}
                    to="/user"
                    sx={{ color: "text.secondary" }}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    aria-label="Trainers"
                    component={Link}
                    to="/trainer"
                    sx={{ color: "text.secondary" }}
                  >
                    Trainer
                  </MenuItem>
                  <MenuItem
                    aria-label="courses"
                    component={Link}
                    to="/course"
                    sx={{ color: "text.secondary" }}
                  >
                    Course
                  </MenuItem>
                  {user?.trainer && (
                    <MenuItem
                      component={Link}
                      to="/course/create"
                      aria-label="create course"
                    >
                      Create Course
                    </MenuItem>
                  )}
                </Menu>
              </>
            ) : (
              <Box>
                <Button
                  aria-label="my profile"
                  component={Link}
                  to="/user"
                  sx={{ color: "text.secondary" }}
                >
                  my profile
                </Button>
                <Button
                  aria-label="trainers"
                  component={Link}
                  to="/trainer"
                  sx={{ color: "text.secondary" }}
                >
                  Trainer
                </Button>
                <Button
                  aria-label="courses"
                  component={Link}
                  to="/course"
                  sx={{ color: "text.secondary" }}
                >
                  Course
                </Button>
                {user?.trainer && (
                  <Button
                    aria-label="create course"
                    component={Link}
                    to="/course/create"
                    sx={{ color: "text.secondary" }}
                  >
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
                  <IconButton
                    color="inherit"
                    onClick={toggleSearchbar}
                    aria-label="open searchbar"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                  aria-label="light or dark mode"
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
                      <Button
                        variant="contained"
                        onClick={handleOpen}
                        aria-label="login/register"
                      >
                        <LoginIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleOpen}
                        aria-label="login/register"
                      >
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
