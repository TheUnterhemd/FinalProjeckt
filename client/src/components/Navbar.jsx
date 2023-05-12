
import { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ThemeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Avatar, Box, IconButton } from "@mui/material/";
import Logo from "./logo.png";
import LoginRegModal from '../components/LoginRegister/LoginRegModal';

const Navbar = () => {
  //declaring variables (Color Mode)
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  //useState => handling open & close of Login/Register Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt="Logo" src={Logo} />
          <Box>?????????????</Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color="inherit">Login</Button>
            <Button variant='contained' onClick={handleOpen}>Login/Register</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginRegModal open={open} close={handleClose} />
    </>
  );
};

export default Navbar;
