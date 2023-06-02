import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button } from "@mui/material";

function ProfileForm() {
  const { user, dispatch } = useContext(AuthContext);

  // user und trainer haben folgende relevante keys gemeinsam:
  // firstName
  // lastName
  // address
  // email
  // imgURL
  // comments

  // user extra: bookedCourses, solvedCourses, interests
  // trainer extra: courses profession

  function handleCourseSubmit(e) {
    e.preventDefault();
    console.log(
      "this will submit the updated profiledata to database and dispatch with the returned user to update context"
    );
  }
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ width: 500, mx: "auto" }}
      onSubmit={(e) => handleCourseSubmit(e)}
    >
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
        Submit changes
      </Button>
    </Box>
  );
}

export default ProfileForm;
