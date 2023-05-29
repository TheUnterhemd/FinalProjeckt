import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Container, Grid, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import CourseCard from "../components/CourseCard";
import MapTest from "../components/map/Map";

// @desc displays all courses available

export default function AllCourses() {
  const url = process.env.REACT_APP_SERVER_URL;
  const { data } = useFetch(`${url}/course/`);

  useEffect(() => {
    console.log("All courses", data);
    console.log("url", url);
  }, [data, url]);

  return (
    <Container sx={{ padding: "2rem" }}>
      <Typography variant="h2">Our Courses</Typography>
      {data && <MapTest markerOptions={data} />}
      <Grid container spacing={2}>
        {data &&
          data.map((course) => (
            <Grid item key={uuid()}>
              <CourseCard data={course} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
