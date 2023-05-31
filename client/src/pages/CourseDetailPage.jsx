// ToDo:
// Bezahlfunktion?
// update needs Authorization or validator needs to be deleted from backend
// updateCurrentStudens URL korrigieren und nur die user und course ID übergeben
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import CourseCreationForm from "./forTrainerFrontend/CourseCreationForm";
import MapTest from "../components/map/Map";
import FormattedDate from "../components/Data Formatting/FormattedDate";
import { update } from "../hooks/update";

export default function CourseDetailPage() {
  const { user, dispatch } = useContext(AuthContext);
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState("");

  const url = process.env.REACT_APP_SERVER_URL;

  const { id } = useParams();
  const { data: course } = useFetch(`${url}/course/${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    if (course) {
      setData(course);
    }
  }, [course]);

  /** starts booking process for a course */
  async function startBooking(e) {
    e.preventDefault();
    const newCourse = await updateCurrStudents();
    setData(newCourse.course);
    const newUser = await updateBookedCourses();
    dispatch({ type: "LOGIN", payload: newUser });
  }

  /** updates currentStudents Array and updates course in DB. Returns updated Course */
  async function updateCurrStudents() {
    const temp = data.currentStudents?.map((student) => student._id) || [];
    temp.push(user._id);
    return await update(
      `${url}/course/update/${user._id}/${data._id}`,
      {},
      user.accessToken
    );
  }
  /** updates bookedCourses Array and updates user in db. Returns updated user */
  async function updateBookedCourses() {
    const temp = user.bookedCourses?.map((course) => course._id);
    temp.push(data._id);
    return await update(
      `${url}/user/update/${user._id}`,
      {
        bookedCourses: temp,
      },
      user.accessToken
    );
  }

  /** this will deactivate the course in the future */
  async function handleDelete() {
    try {
      console.log("this will deactivate the course in the future");
      // const newCourse = await update(
      //   `${url}/course/update/${data._id}`,
      //   {
      //     active: false,
      //   },
      //   user.accessToken
      // );
      // console.log("newCourse CourseDetailPage:handleDelete", newCourse);
    } catch (error) {
      console.log("error CourseDetailPage:handleDelete", error);
    }
  }
  // calculate the duration in days & hours
  const days = Math.floor(data?.duration / 24);
  const remainingHours = data?.duration % 24;
  const duration =
    days === 0
      ? `${remainingHours} hours`
      : `${days} days ${remainingHours} hours`;

  console.log(user);
  return (
    <div>
      {!edit && data && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            sm={3.7}
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
              alt={`picture of ${data.title}`}
              src={data.imgURL}
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
              {data.title} <Chip label={`${data.price} €`} />
            </Typography>
            <Typography variant="body2" gutterBottom>
              {data.description}
            </Typography>

            <Box sx={{ width: "300px", height: "200px", my: 2 }}>
              <MapTest markerOptions={{ data: [data] }} />
            </Box>
            <Typography variant="body1">
              Location: {data?.location?.description}
            </Typography>
            <FormattedDate startDate={data.start} />
            <FormattedDate endDate={data.end} />
            <Typography variant="body1">Duration: {duration}</Typography>
            <Typography variant="h6" gutterBottom>
              Trainer
            </Typography>
            <Chip
              avatar={
                <Avatar
                  src={data.trainer?.imgURL}
                  alt={`Avatar for ${data.trainer.firstName}`}
                />
              }
              label={data.trainer?.firstName}
              onClick={() => navigate(`/trainer/${data.trainer._id}`)}
            ></Chip>
            <Typography variant="h6" gutterBottom>
              Participants
            </Typography>
            <Box display="flex" gap={1}>
              {data.currentStudents.length > 0
                ? data.currentStudents.map((student) => (

                    <Avatar
                      src={student.imgURL}
                      alt={student.firstName}
                      key={student._id}
                    />
                  ))

                : "Be the first to participate!"}
            </Box>
            {user && !user.isTrainer && (
              <>
                {user.bookedCourses.filter((course) => course._id === data._id)
                  .length === 0 ? (
                  <Button
                    variant="outlined"
                    sx={{ mt: 1 }}
                    onClick={(e) => startBooking(e)}
                  >
                    Book now!
                  </Button>
                ) : (
                  "You booked this course already"
                )}
              </>
            )}
          </Grid>
        </Grid>
      )}
      {user && user.trainer && data && data?.trainer._id === user._id && (
        <Box sx={{ mt: 3 }}>
          <Chip
            label={!edit ? "Edit Course" : "Show Course"}
            onClick={() => setEdit(!edit)}
            sx={{ mr: 1 }}
          ></Chip>
          <Chip label="Delete Course" onClick={() => handleDelete()}></Chip>
        </Box>
      )}
      {edit && data && user?.trainer && (
        <CourseCreationForm course={data} setEdit={setEdit} />
      )}
    </div>
  );
}
