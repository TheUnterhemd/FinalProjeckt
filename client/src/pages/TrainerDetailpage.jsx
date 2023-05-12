import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SmallCards from "../components/SmallCards";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import Favorite from "@mui/icons-material/Favorite";
import { v4 as uuid } from "uuid";

export default function TrainerDetailpage() {
  const theme = useTheme();
  const { id } = useParams();
  // "counter" gibt es nur um die kommentarspalte realtime upzudaten
  const [counter, setCounter] = useState("");
  const url = process.env.REACT_APP_SERVER_URL;
  const { data: trainer } = useFetch(`${url}/trainer/${id}`);
  const { data: comments } = useFetch(`${url}/comment/${id}`);

  useEffect(() => {
    setCounter(comments?.length);
    // console.log("comments in trainerdetailpage", comments);
    // console.log("trainer in trainerdetailpage", trainer);
    console.log("added a comment");
  }, [trainer, comments]);

  function handleLike(e) {
    e.preventDefault();
    console.log("currently not enabled");
  }
  return (
    <div>
      {trainer && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent="center"
            alignItems="start"
            sx={{
              [theme.breakpoints.up("md")]: {
                justifyContent: "center",
                alignItems: "flex-start",
              },
            }}
          >
            <Avatar
              alt={`picture of ${trainer.firstName}`}
              src={trainer.imgURL}
              sx={{
                width: 200,
                height: 200,
                transition: "all 0.2s",
                [theme.breakpoints.up("md")]: {
                  height: "100%",
                  maxHeight: 600,
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
              {trainer.firstName} {trainer.lastName}{" "}
              <Favorite color="error" onClick={(e) => handleLike(e)} />
            </Typography>
            <Typography variant="h6">Profession</Typography>
            <Typography variant="body2" gutterBottom>
              {trainer.profession}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Courses offered
            </Typography>
            {trainer.courses.length > 0 ? (
              <SmallCards trainer={trainer.courses} />
            ) : (
              "Currrently no courses offered."
            )}
            <Typography variant="h6" gutterBottom>
              {counter} Comments
            </Typography>
            <CommentForm
              data={trainer}
              setCounter={setCounter}
              comments={comments}
            />
            <Box>
              {comments?.length > 0
                ? comments.map((comment) => (
                    <CommentCard data={comment} key={uuid()} />
                  ))
                : "Be the first to comment!"}
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
