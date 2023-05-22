// import React from "react";
// import Searchbar from "../components/Search/Searchbar.jsx";
// import { Box } from "@mui/system";
// import beispielBild from "../assets/beispielBild.jpg";

// export default function LandingPage() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "80%",
//         margin: "4rem auto",
//       }}
//     >
//       <img
//         src={beispielBild}
//         alt="bild"
//         style={{
//           width: "100%",
//           height: "auto",
//           maxHeight: "800px",
//         }}
//       />
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           backgroundColor: "#632b5d",
//           padding: "1rem",
//           width: "70%",
//         }}
//       >
//         <Searchbar />
//       </Box>
//     </Box>
//   );
//  }  // kod za prvi deo ok je

import React from "react";
import Searchbar from "../components/Search/Searchbar.jsx";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import beispielBild from "../assets/beispielBild.jpg";

export default function LandingPage() {
  return (
    <Box sx={{ width: "80%", margin: "4rem auto" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <img
          src={beispielBild}
          alt="bild"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "800px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#632b5d",
            padding: "1rem",
            width: "70%",
            maxWidth: "400px", // Limit the maximum width of the searchbar
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Searchbar />
        </Box>
      </Box>

      <Box sx={{ padding: "2rem", maxWidth: "70%" }}>
        <Typography variant="h4" sx={{ marginBottom: "2rem", textAlign: "center" }}>
          About Local Trainer
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#f5f5f5",
                minHeight: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.9s ease",
                "&:hover": {
                  transform: "rotateY(180deg)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">Our Mission</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut nisi vitae neque consectetur
                  fringilla. Curabitur sed nisl leo. Integer quis justo ac quam iaculis interdum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#f5f5f5",
                minHeight: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.9s ease",
                "&:hover": {
                  transform: "rotateY(180deg)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">Our Goals</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut nisi vitae neque consectetur
                  fringilla. Curabitur sed nisl leo. Integer quis justo ac quam iaculis interdum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: "#f5f5f5",
                minHeight: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.9s ease",
                "&:hover": {
                  transform: "rotateY(180deg)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">Our Team</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut nisi vitae neque consectetur
                  fringilla. Curabitur sed nisl leo. Integer quis justo ac quam iaculis interdum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

