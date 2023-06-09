import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Avatar, Box, Chip, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmallCards from "../components/SmallCards.jsx";
import CourseShowcase from "../components/CourseShowcase";
import ProfileForm from "../components/UpdateForms/ProfileForm.jsx";
import EmailPasswordForm from "../components/UpdateForms/EmailPasswordForm.jsx";

/**displays the profile of the user  */
function UserProfile() {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updatePW, setUpdatePW] = useState(false);

  // getting theme for colors
  const theme = useTheme();

  // getting the logged in user out of AuthContext
  const { user } = useContext(AuthContext);

  //if user.address = empty force update
  useEffect(() => {
    user.address === undefined && setEdit(true);
  }, [user.address]);

  let upcomingCourses = user?.courses?.filter((course) => {
    const courseStartDate = course.start.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return courseStartDate >= today;
  });

  let pastCourses = user?.courses?.filter((course) => {
    const courseStartDate = course.start.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return courseStartDate <= today;
  });

  return (
    <Box sx={{ my: 10, p: "2rem" }}>
      <Typography variant="h2" sx={{ textDecoration: "underline", mb: 3 }}>
        Your Profile
      </Typography>
      {user && !edit && !updatePW && (
        <Grid
          container
          spacing={4}
          sx={{
            my: "2rem",
          }}
        >
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
                boxShadow: "0px 2px 10px 0px #145191",
              }}
            ></Avatar>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: "background.boxes",
              }}
            >
              <Typography variant="h4" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>

              {/* displays if user is a trainer */}
              {user.trainer && (
                <>
                  <Typography variant="h4">Upcoming Courses</Typography>
                  {upcomingCourses && upcomingCourses.length > 0 ? (
                    <Grid
                      container
                      spacing={2}
                      sx={{ width: "60%" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mb={1}
                    >
                      {showAllCourses ? (
                        upcomingCourses?.map((course) => (
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
                          {upcomingCourses?.slice(0, 3).map((course) => (
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
                          {upcomingCourses.length > 3 && (
                            <Typography
                              variant="body2"
                              sx={{
                                cursor: "pointer",
                                color: theme.palette.primary.main,
                                marginBottom: 2,
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
                    "Currrently no upcoming courses."
                  )}
                  {/* Past Courses */}
                  <Typography variant="h4">Past Courses</Typography>
                  {pastCourses && pastCourses.length > 0 ? (
                    <Grid
                      container
                      spacing={2}
                      sx={{ width: "60%" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mb={1}
                    >
                      {showAllCourses ? (
                        pastCourses?.map((course) => (
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
                          {pastCourses.slice(0, 3).map((course) => (
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
                          {pastCourses.length > 3 && (
                            <Typography
                              variant="body2"
                              sx={{
                                cursor: "pointer",
                                color: theme.palette.primary.main,
                                marginBottom: 2,
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
                    "No past courses to display."
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
                  <SmallCards data={user?.bookedCourses} />
                  <Typography variant="h6" gutterBottom>
                    Past Courses
                  </Typography>
                  <SmallCards data={user?.solvedCourses} />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      {!updatePW && (
        <Chip
          label={!edit ? "Edit profile" : "Show profile"}
          onClick={() => setEdit(!edit)}
          sx={{ mr: 1 }}
        ></Chip>
      )}
      {!edit && (
        <Chip
          label={!updatePW ? "Update Password/Email" : "Show profile"}
          onClick={() => setUpdatePW(!updatePW)}
          sx={{ mr: 1 }}
        ></Chip>
      )}
      {user && edit && <ProfileForm setEdit={setEdit} />}
      {user && updatePW && <EmailPasswordForm />}
    </Box>
  );
}

export default UserProfile;
