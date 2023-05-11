import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// @desc used to display a person (Trainer / User) in an overview page
export default function CourseCard({ data }) {
  const navigate = useNavigate();
  function clickHandler(e) {
    e.preventDefault();
    navigate(`/course/${data._id}`);
  }

  return (
    <Card sx={{ width: 250, maxWidth: 250 }} onClick={(e) => clickHandler(e)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.imgURL}
          alt={`picture for ${data.title}`}
        />
        <Box
          display="flex"
          alignItems="center"
          sx={{ padding: "10px", gap: "10px" }}
        >
          <Avatar
            alt={`picture of ${
              data.trainer?.firstName || "fakenameforTesting"
            }`}
            src={
              data.trainer?.imgURL || "https://picsum.photos/200/300?random=2"
            }
          ></Avatar>
          <Typography variant="body1">
            by {data.trainer?.firstName || "No"}{" "}
            {data.trainer?.lastName || "One"}
          </Typography>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body1">Location: {data.location}</Typography>
          <Typography variant="body1">
            Starts: {data.start.split("_").join(" ")}
          </Typography>
          <Typography variant="body1">
            Ends: {data.end.split("_").join(" ")}
          </Typography>
          <Chip label={`${data.price} €`} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
