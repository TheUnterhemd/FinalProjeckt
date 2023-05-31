import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmallCards from "../components/SmallCards.jsx";
import CourseShowcase from "../components/CourseShowcase";

/**displays the profile of the user  */
function UserProfile() {
  const [showAllCourses, setShowAllCourses] = useState(false);

  // getting theme for colors
  const theme = useTheme();

  // getting the logged in user out of AuthContext
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Typography variant="h3" sx={{ my: 2 }}>
        Your Profile
      </Typography>
      {user && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="center"
            alignItems="start"
            sx={{
              [theme.breakpoints.up("md")]: {
                justifyContent: "center",
                alignItems: "flex-start",
              },
            }}
          >
            <Avatar
              alt="picture of yourself"
              src={user.imgURL}
              sx={{
                width: 200,
                height: 200,
                transition: "all 0.2s",
                [theme.breakpoints.up("md")]: {
                  height: "100%",
                  maxHeight: 600,
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
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>

            {/* displays if user is a trainer */}
            {user.trainer && (
              <>
                <Typography variant="h4">Courses</Typography>
                {user.courses && user.courses.length > 0 ? (
                  <Grid
                    container
                    spacing={2}
                    sx={{ width: "60%" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {showAllCourses ? (
                      user.courses.map((course) => (
                        <Grid
                          item
                          md={12}
                          lg={6}
                          xl={4}
                          key={course._id}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <CourseShowcase data={course} />
                        </Grid>
                      ))
                    ) : (
                      <>
                        {user.courses.slice(0, 3).map((course) => (
                          <Grid
                            item
                            md={12}
                            lg={6}
                            xl={4}
                            key={course._id}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <CourseShowcase data={course} />
                          </Grid>
                        ))}
                        {user.courses.length > 3 && (
                          <Typography
                            variant="body2"
                            sx={{
                              cursor: "pointer",
                              color: theme.palette.primary.main,
                            }}
                            onClick={() => setShowAllCourses(true)}
                          >
                            Show more...
                          </Typography>
                        )}
                      </>
                    )}
                  </Grid>
                ) : (
                  "Currrently no courses offered."
                )}
              </>
            )}

            {/* displays if user is not a trainer */}
            {!user.trainer && (
              <>
                <Typography variant="h6">Interests</Typography>
                <Typography variant="body2" gutterBottom>
                  {user?.interests?.join(", ")}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Booked Courses
                </Typography>
                <SmallCards data={user.bookedCourses} />
                <Typography variant="h6" gutterBottom>
                  Past Courses
                </Typography>
                <SmallCards data={user.solvedCourses} />
              </>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default UserProfile;
