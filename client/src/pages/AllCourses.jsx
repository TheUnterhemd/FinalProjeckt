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

  useEffect(() => {
    console.log("All courses", data);
    console.log("url", url);
  }, [data, url]);

  let filteredCourses = data;

  switch (sort) {
    case 'ascPrice':
      filteredCourses = filteredCourses?.sort((a, b) => a.price - b.price);
      break;
    case 'descPrice':
      filteredCourses = filteredCourses?.sort((a, b) => b.price - a.price);
      break;
    case 'ascDate':
      filteredCourses = filteredCourses?.sort((a, b) => new Date(a.start) - new Date(b.start));
      break;
    case 'descDate':
      filteredCourses = filteredCourses?.sort((a, b) => new Date(b.start) - new Date(a.start));
      break;
    default:
  }


  return (
    <Container sx={{ padding: "2rem" }}>
      <Typography variant="h2">Our Courses</Typography>
      <SortMenu />

      {data && <MapTest markerOptions={{data}} />}
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
