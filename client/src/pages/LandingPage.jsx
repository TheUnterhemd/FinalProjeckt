import React from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box } from "@mui/system";
import beispielBild from "../assets/beispielBild.jpg";
import Grid from "@mui/material/Unstable_Grid2/Grid2.js";

export default function LandingPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} lg={6}>
        <img
          src={beispielBild}
          alt="bild"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "800px",
            marginTop: "4rem",
            marginBottom: "4rem",
          }}
        />
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        <Box
          sx={{
            backgroundColor: "#632b5d",
            padding: "1rem",
            width: "70%",
          }}
          css={{
            "@media (max-width: 600px)": {
              width: "90%",
            },
          }}
        >
          <Searchbar />
        </Box>
      </Grid>
    </Grid>
  );
}
