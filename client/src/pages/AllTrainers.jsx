import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import PersonCard from "../components/PersonCard";
import { Container, Grid, Typography } from "@mui/material";
// @desc displays all trainers available

export default function AllTrainers() {
  const url = "http://localhost:5002";
  const { data } = useFetch(`${url}/trainer/`);
  useEffect(() => {
    console.log("All Trainers", data);
    console.log("url", url);
  }, [data]);

  return (
    <Container sx={{ padding: "2rem" }}>
      <Typography variant="h2">Our Trainers</Typography>
      <Grid container spacing={2}>
        {data &&
          data.map((trainer) => (
            <Grid item>
              <PersonCard data={trainer} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
