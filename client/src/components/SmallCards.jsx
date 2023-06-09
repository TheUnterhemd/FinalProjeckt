import React from "react";
import { v4 as uuid } from "uuid";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function SmallCards({ data }) {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        justifyContent: "center",
        flexWrap: "wrap",
        mb: "1.5rem",
      }}
    >
      {data &&
        data?.map((course) => (
          <Card
            key={uuid()}
            sx={{
              maxWidth: 120,
              minWidth: 120,
              minHeight: 200,
              maxHeight: 200,
              boxShadow: "0px 2px 10px 0px #145191",
            }}
          >
            <CardActionArea>
              <CardMedia
                image={course.imgURL}
                title={course.title}
                sx={{ height: 80 }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {course.title}
                </Typography>
                {course.trainer && (
                  <Typography
                    varant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    mit{" "}
                    <Link
                      style={{ color: "white" }}
                      to={`/trainer/${course.trainer._id}`}
                    >
                      {course.trainer.firstName}
                    </Link>
                  </Typography>
                )}
              </CardContent>
              <Link style={{ color: "white" }} to={`/course/${course._id}`}>
                <ArrowForwardIcon />
              </Link>
            </CardActionArea>
          </Card>
        ))}
    </Grid>
  );
}
