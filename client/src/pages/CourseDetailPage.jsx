import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Link,
  Grid,
  Typography,
} from "@mui/material";
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
  const [error, setError] = useState("");

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
    const newCourse = await updateCurrStudents(user, data);
    if (newCourse.error) {
      return setError(newCourse.content);
    }
    setData(newCourse.course);
    const newUser = await updateBookedCourses(user, data);

    if (newUser.error) {
      return setError(newUser.content);
    }
    dispatch({ type: "LOGIN", payload: newUser });
  }
  /** updates bookedCourses Array with current course id (data._id) and updates user in db. Returns updated user */
  async function updateBookedCourses(user, data) {
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

  /** updates currentStudents Array with current course id (data._id) and updates course in DB. Returns updated Course */
  async function updateCurrStudents(user, data) {
    const temp = data.currentStudents?.map((student) => student._id) || [];
    temp.push(user._id);
    return await update(
      `${url}/course/update/${user._id}/${data._id}`,
      {},
      user.accessToken
    );
  }
  /** this will deactivate the course in the future */
  async function handleDelete() {
    try {
      const newCourse = await update(
        `${url}/course/update/${data._id}`,
        {
          active: false,
        },
        user.accessToken
      );
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

  return (
    <div>
      {!edit && data && (
        <Grid container spacing={2} sx={{ my: 10 }}>
          {error && <Alert severity="error">{error}</Alert>}
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
              alt={`picture for ${data?.title}`}
              src={data?.imgURL}
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
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: "100%", wordWrap: "break-word" }}
            >
              {data.description}
            </Typography>

            <Box sx={{ width: "300px", height: "200px", my: 2 }}>
              <MapTest markerOptions={{ data: [data] }} />
            </Box>
            {data?.location?.description !== "online" ? (
              <Typography variant="body1">
                Location: {data?.location?.description}
              </Typography>
            ) : user?.bookedCourses?.filter((c) => c._id === data._id).length >
              0 ? (
              <Link
                href={data?.location?.location}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data?.location?.location}
              </Link>
            ) : (
              <Typography variant="body1">
                Location: {data?.location?.description}
              </Typography>
            )}

            <FormattedDate startDate={data.start} />
            <FormattedDate endDate={data.end} />
            <Typography variant="body1">Duration: {duration}</Typography>
            <Typography variant="h6" gutterBottom>
              Trainer
            </Typography>
            <Chip
              avatar={
                <Avatar
                  src={data?.trainer?.imgURL}
                  alt={`Avatar for ${data?.trainer?.firstName}`}
                />
              }
              label={data.trainer?.firstName}
              title={data?.trainer?.firstName}
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
                      title={`${student.firstName} ${student.lastName}`}
                    />
                  ))
                : "Be the first to participate!"}
            </Box>
            {user && !user.trainer && (
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
        <CourseCreationForm course={data} setEdit={setEdit} setData={setData} />
      )}
    </div>
  );
}
