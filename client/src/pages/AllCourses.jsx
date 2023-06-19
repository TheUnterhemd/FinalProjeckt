import { useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { Container, Grid, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import CourseCard from "../components/CourseCard";
import MapTest from "../components/map/Map";
import SortMenu from "../components/SortMenu";
import { SortContext } from "../context/SortContext";

// @desc displays all courses available

export default function AllCourses() {
  const url = process.env.REACT_APP_SERVER_URL;
  const { data } = useFetch(`${url}/course/`);

  const { sort } = useContext(SortContext);

  let filteredCourses = data;

  switch (sort) {
    case "ascPrice":
      filteredCourses = filteredCourses?.sort((a, b) => a.price - b.price);
      break;
    case "descPrice":
      filteredCourses = filteredCourses?.sort((a, b) => b.price - a.price);
      break;
    case "ascDate":
      filteredCourses = filteredCourses?.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      break;
    case "descDate":
      filteredCourses = filteredCourses?.sort(
        (a, b) => new Date(b.start) - new Date(a.start)
      );
      break;
    default:
  }

  //filter to only show courses that are upcoming
  filteredCourses = filteredCourses?.filter((course) => {
    const courseStartDate = course.start.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return courseStartDate >= today;
  });

  return (
    <Container sx={{ padding: "2rem", my: 10 }}>
      <Typography variant="h2" sx={{ textDecoration: "underline", mb: 3 }}>
        Our Courses
      </Typography>
      <SortMenu />

      {data && <MapTest markerOptions={{ data }} />}
      <Grid container spacing={2} justifyContent="center">
        {data &&
          filteredCourses.map((course) => (
            <Grid item key={uuid()}>
              <CourseCard data={course} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
