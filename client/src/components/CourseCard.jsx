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
import FormattedDate from "./Data Formatting/FormattedDate";

// @desc used to display a Course in an overview page
export default function CourseCard({ data }) {
  const navigate = useNavigate();
  /**navigates to detailpage of course */
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
            alt={`picture of ${data.trainer?.firstName || "fakenameforTesting"
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
          <Box sx={{
            overflow: 'hidden',
            maxWidth: '15rem',
          }}>
            <Typography gutterBottom variant="h5" component="div"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {data.title}
            </Typography>
            <Typography variant="body1" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>Location: {data.location}</Typography>
            <FormattedDate startDate={data?.start} />
            <FormattedDate endDate={data?.end} />
            <Chip label={`${data.price} €`} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
