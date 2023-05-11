import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button, Avatar, Box } from "@mui/material/";
import Logo from "./logo.png";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar alt="Logo" src={Logo} />
        <Box>?????????????</Box>
        <Box sx={{ flexGrow: 0 }}>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
