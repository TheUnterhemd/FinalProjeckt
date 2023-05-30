// ToDo:
// "deactivate" button for trainer who created course
// booking function

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import CourseCreationForm from "./forTrainerFrontend/CourseCreationForm";
import MapTest from "../components/map/Map";
import FormattedDate from "../components/Data Formatting/FormattedDate";

export default function CourseDetailPage() {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const [edit, setEdit] = useState(false);

  const url = process.env.REACT_APP_SERVER_URL;
  const { id } = useParams();
  const { data } = useFetch(`${url}/course/${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data in CourseDetailPage", data);
    console.log("user in courseDetailpage", user);
  }, [data, user]);

  /** starts booking process for a course */
  function startBooking(e) {
    e.preventDefault();
    console.log("does nothing at the moment");
  }

  // calculate the duration in days & hours
  const days = Math.floor(data?.duration / 24);
  const remainingHours = data?.duration % 24;
  const duration = days === 0 ? `${remainingHours} hours` : `${days} days ${remainingHours} hours`;

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
              <MapTest markerOptions={[data]} />
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
                  src={data.trainer.imgURL}
                  alt={`Avatar for ${data.trainer.firstName}`}
                />
              }
              label={data.trainer.firstName}
              onClick={() => navigate(`/trainer/${data.trainer._id}`)}
            ></Chip>
            <Typography variant="h6" gutterBottom>
              Participants
            </Typography>
            <Box display="flex" gap={1}>
              {data.currentStudents.length > 0
                ? data.currentStudents.map((student) => (
                  <Avatar src={student.imgURL} alt={student.firstName} />
                ))
                : "Be the first to participate!"}
            </Box>
            {user && (
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={(e) => startBooking(e)}
              >
                Book now!
              </Button>
            )}
          </Grid>
        </Grid>
      )}
      {user && user.isTrainer && data?.trainer._id === user._id && (
        <Chip
          label={!edit ? "Edit Course" : "Show Course"}
          sx={{ mt: 3 }}
          onClick={() => setEdit(!edit)}
        ></Chip>
      )}
      {edit && data && <CourseCreationForm course={data} />}
    </div>
  );
}
