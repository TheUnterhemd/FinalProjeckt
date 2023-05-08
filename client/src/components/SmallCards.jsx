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
      {data.map((course) => (
        <Grid item xs={12} md={4}>
          <Card key={uuid()}>
            <CardMedia
              image={course.picture}
              title={course.cname}
              sx={{ height: 80 }}
            />
            <CardContent>
              <Typography variant="h6">{course.cname}</Typography>
              <Typography varant="body2">
                mit <Link>{course.trainer}</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
