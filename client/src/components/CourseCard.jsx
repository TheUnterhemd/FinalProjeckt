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

// @desc used to display a Course in an overview page
export default function CourseCard({ data }) {
  const navigate = useNavigate();
  /**navigates to detailpage of course */
  function clickHandler(e) {
    e.preventDefault();
    navigate(`/course/${data._id}`);
  }

  //formattedDates
  const startDate = new Date(data.start);
  const startDay = String(startDate.getDate()).padStart(2, '0');
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startYear = startDate.getFullYear();
  const formattedStartDate = `${startDay}.${startMonth}.${startYear}`;

  const endDate = new Date(data.end);
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endYear = endDate.getFullYear();
  const formattedEndDate = `${endDay}.${endMonth}.${endYear}`;


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
            <Typography variant="body1">
              Starts: {formattedStartDate + ` |${data.start.split('T')[1]}`}
            </Typography>
            <Typography variant="body1">
              Ends: {formattedEndDate + ` |${data.end.split('T')[1]}`}
            </Typography>
            <Chip label={`${data.price} €`} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
