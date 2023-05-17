import React from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box } from "@mui/system";
import beispielBild from "../assets/beispielBild.jpg";


export default function LandingPage() {
  return (
    <div style={{ position: "relative" }}>
      <img
       src={beispielBild} 
       alt="bild"
       style={{ width: "90%", maxHeight: "800px", marginTop: "4rem", marginBottom: "4rem" }}
        />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#632b5d",
          padding: "1rem",
          width: "70%",
        }}
      >
        <Searchbar />
      </Box>
    </div>
  );
}
