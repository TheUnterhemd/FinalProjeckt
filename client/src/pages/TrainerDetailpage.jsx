import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmallCards from "../components/SmallCards";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

export default function TrainerDetailpage() {
  const theme = useTheme();
  const { id } = useParams();
  // "counter" gibt es nur um die kommentarspalte realtime upzudaten
  const [counter, setCounter] = useState("");

  const url = "http://localhost:5002";
  const { data } = useFetch(`${url}/trainer/${id}`);
  useEffect(() => {
    setCounter(data?.comments.length);
    console.log("data in detailpage", data);
  }, [data]);

  return (
    <div>
      {data && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              [theme.breakpoints.up("md")]: {
                justifyContent: "flex-end",
                alignItems: "flex-end",
              },
            }}
          >
            <Avatar
              alt={`picture of ${data.firstName}`}
              src={data.imageURL}
              sx={{
                width: 200,
                height: 200,
                transition: "all 0.2s",
                [theme.breakpoints.up("md")]: {
                  height: "100%",
                  width: "100%",
                  borderRadius: "0 50% 50% 0%/0% 60% 25% 0%",
                },
              }}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4" gutterBottom>
              {data.firstName} {data.lastName}
            </Typography>
            <Typography variant="h6">Profession</Typography>
            <Typography variant="body2" gutterBottom>
              {data.profession}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Courses offered
            </Typography>
            {data.courses.length > 0 ? (
              <SmallCards data={data.courses} />
            ) : (
              "Currrently no courses offered."
            )}
            <Typography variant="h6" gutterBottom>
              {counter} Comments
            </Typography>
            <CommentForm data={data} setCounter={setCounter} />
            {data.comments.length > 0
              ? data.comments.map((comment) => <CommentCard data={comment} />)
              : "Be the first to comment!"}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
