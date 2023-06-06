import React from "react";
import { v4 as uuid } from "uuid";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";

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
            }}
          >
            <CardMedia
              image={course.picture}
              title={course.title}
              sx={{ height: 80 }}
            />
            <CardContent>
              <Typography variant="h6">{course.title}</Typography>
              {course.trainer && (
                <Typography varant="body2">
                  mit{" "}
                  <Link to={`/trainer/${course.trainer._id}`}>
                    {course.trainer.firstName}
                  </Link>
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
    </Grid>
  );
}
