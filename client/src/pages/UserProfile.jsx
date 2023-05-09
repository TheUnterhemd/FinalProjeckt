import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmallCards from "../components/SmallCards.jsx";

function UserProfile() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  console.log("theme", theme);
  return (
    <div>
      {user && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              [theme.breakpoints.up("md")]: {
                justifyContent: "flex-end",
                alignItems: "flex-end",
              },
            }}
          >
            <Avatar
              alt="This is just a test"
              src={user.imgURL}
              sx={{
                width: 200,
                height: 200,
                transition: "all 0.2s",
                [theme.breakpoints.up("md")]: {
                  height: "100%",
                  width: "100%",
                  borderRadius: "0 50% 50% 0%/0% 60% 25% 0%",
                },
              }}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h6">Interests</Typography>
            <Typography variant="body2" gutterBottom>
              {user.interests.join(", ")}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Booked Courses
            </Typography>
            <SmallCards data={user.bookedCourses} />
            <Typography variant="h6" gutterBottom>
              Past Courses
            </Typography>
            <SmallCards data={user.solvedCourses} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default UserProfile;
