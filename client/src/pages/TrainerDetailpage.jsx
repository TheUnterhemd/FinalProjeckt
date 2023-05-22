import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CourseShowcase from "../components/CourseShowcase";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import Favorite from "@mui/icons-material/Favorite";
import { v4 as uuid } from "uuid";

export default function TrainerDetailpage() {
  const theme = useTheme();
  const { id } = useParams();
  // "counter" gibt es nur um die kommentarspalte realtime upzudaten
  const [counter, setCounter] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const url = process.env.REACT_APP_SERVER_URL;
  console.log(url);
  const { data: trainer } = useFetch(`${url}/trainer/${id}`);
  const { data: comments } = useFetch(`${url}/comment/${id}`);

  useEffect(() => {
    if (comments) {
      setCounter(comments?.length);
      setCommentList(comments);
    }

    // console.log("comments in trainerdetailpage", comments);
    console.log("trainer in trainerdetailpage", trainer);
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
            sm={3.7}
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
            {trainer.courses && trainer.courses.length > 0
              ? (
                <Grid container spacing={2} sx={{ width: "60%" }} display="flex" justifyContent="center" alignItems="center">
                  {showAllCourses ? trainer.courses.map((course) => (
                    <Grid item md={12} lg={6} xl={4} key={course._id} display="flex" justifyContent="center" alignItems="center">
                      <CourseShowcase data={course} />
                    </Grid>
                  )) : (
                    <>
                      {trainer.courses.slice(0, 3).map((course) => (
                        <Grid item md={12} lg={6} xl={4} key={course._id} display="flex" justifyContent="center" alignItems="center">
                          <CourseShowcase data={course} />
                        </Grid>
                      ))}
                      {trainer.courses.length > 3 && (
                        <Typography variant="body2"
                          sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                          onClick={() => setShowAllCourses(true)}>
                          Show more...
                        </Typography>
                      )}
                    </>
                  )}
                </Grid>
              )
              : "Currrently no courses offered."}
            <Typography variant="h6" gutterBottom>
              {counter} Comments
            </Typography>
            <CommentForm
              data={trainer}
              setCounter={setCounter}
              setCommentList={setCommentList}
            />
            <Box>
              {commentList?.length > 0
                ? commentList.map((comment) => (
                  <CommentCard
                    data={comment}
                    key={uuid()}
                    setCommentList={setCommentList}
                    setCounter={setCounter}
                  />
                ))
                : "Be the first to comment!"}
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
