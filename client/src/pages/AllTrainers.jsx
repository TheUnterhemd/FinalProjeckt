import React, { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import PersonCard from "../components/PersonCard";
import { Container, Grid, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
// @desc displays all trainers available

export default function AllTrainers() {
  const url = process.env.REACT_APP_SERVER_URL;
  const { data } = useFetch(`${url}/trainer/`);

  return (
    <Container sx={{ p: 4, my: 10 }}>
      <Typography variant="h2" sx={{ textDecoration: "underline", mb: 3 }}>
        Our Trainers
      </Typography>
      <Grid container spacing={2} justifyContent="center">
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
