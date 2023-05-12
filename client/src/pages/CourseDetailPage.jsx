import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CourseDetailPage() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;
  const { data } = useFetch(`${url}/course/${id}`);

  useEffect(() => {
    console.log("data in CourseDetailPage", data);
  }); /** starts booking process for a course */
  function startBooking(e) {
    e.preventDefault();
    console.log("does nothing at the moment");
  }
  return (
    <div>
      {data && (
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
            <Typography variant="body1">Location: {data.location}</Typography>
            <Typography variant="body1">{data.start.split("_")[0]}</Typography>
            <Typography variant="body1">
              Starts {data.start.split("_")[1]}
            </Typography>
            <Typography variant="body1">Duration {data.duration}</Typography>
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
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={(e) => startBooking(e)}
            >
              Book now!
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
