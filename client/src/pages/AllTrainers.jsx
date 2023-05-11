import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import PersonCard from "../components/PersonCard";
import { Container, Grid, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
// @desc displays all trainers available

export default function AllTrainers() {
  const url = process.env.REACT_APP_SERVER_URL;
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
            <Grid item key={uuid()}>
              <PersonCard data={trainer} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
