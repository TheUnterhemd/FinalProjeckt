import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Avatar, Grid, Typography } from "@mui/material";
import SmallCards from "../components/SmallCards.jsx";

function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              alt="This is just a test"
              src={user.imgURL}
              sx={{ width: "100%", height: "100%" }}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h4">Interests</Typography>
            <Typography variant="body1">{user.interests.join(", ")}</Typography>
            <Typography variant="h4">booked courses</Typography>
            <SmallCards data={user.bookedCourses} />
            <Typography variant="h4">past courses</Typography>
            <SmallCards data={user.solvedCourses} />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default UserProfile;
