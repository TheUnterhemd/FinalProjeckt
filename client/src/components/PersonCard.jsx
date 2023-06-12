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
    navigate(`/trainer/${data._id}`);
  }
  return (
    <Card
      sx={{ width: 250, maxWidth: 250, boxShadow: "0px 2px 10px 0px #145191" }}
      key={data._id}
      onClick={(e) => clickHandler(e)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.imgURL}
          alt={`picture of ${data.firstName}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.firstName} {data.lastName}
          </Typography>
          {data.profession && (
            <Typography
              variant="h6"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Profession: {data.profession}
            </Typography>
          )}
          {data.likes && (
            <Typography variant="body1">{data.likes.length} likes</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
