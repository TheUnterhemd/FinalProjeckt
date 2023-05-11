import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

// @desc used to display a person (Trainer / User) in an overview page
export default function PersonCard({ data }) {
  const navigate = useNavigate();
  function clickHandler(e) {
    e.preventDefault();
    navigate(`/trainers/${data._id}`);
  }
  return (
    <Card sx={{ width: 250, maxWidth: 250 }} onClick={(e) => clickHandler(e)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.imgURL}
          alt={`picture of ${data.firstName}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.firstName} {data.lastName}
          </Typography>
          <Typography variant="h6">Profession: {data.profession}</Typography>
          <Typography variant="body1">{data.likes.length} likes</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
