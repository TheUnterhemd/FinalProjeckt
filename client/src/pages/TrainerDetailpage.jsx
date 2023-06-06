import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CourseShowcase from "../components/CourseShowcase";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/AuthContext";

export default function TrainerDetailpage() {
  const theme = useTheme();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  // "counter" gibt es nur um die kommentarspalte realtime upzudaten
  const [counter, setCounter] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const url = process.env.REACT_APP_SERVER_URL;
  const { data: trainer } = useFetch(`${url}/trainer/${id}`);
  const { data: comments } = useFetch(`${url}/comment/${id}`);

  useEffect(() => {
    if (comments) {
      setCounter(comments?.length);
      setCommentList(comments);
    }
  }, [trainer, comments]);

  let upcomingCourses = trainer?.courses.filter((course) => {
    const courseStartDate = course.start.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return courseStartDate >= today;
  })

  let pastCourses = trainer?.courses.filter((course) => {
    const courseStartDate = course.start.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return courseStartDate <= today;
  })


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
            </Typography>
            <Typography variant="h6">Profession</Typography>
            <Typography variant="body2" gutterBottom>
              {trainer.profession}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Upcoming Courses
            </Typography>
            {upcomingCourses && upcomingCourses.length > 0 ? (
              <Grid
                container
                spacing={2}
                sx={{ width: "60%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {showAllCourses ? (
                  upcomingCourses.map((course) => (
                    <Grid
                      item
                      md={12}
                      lg={6}
                      xl={4}
                      key={course._id}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CourseShowcase data={course} />
                    </Grid>
                  ))
                ) : (
                  <>
                    {upcomingCourses.slice(0, 3).map((course) => (
                      <Grid
                        item
                        md={12}
                        lg={6}
                        xl={4}
                        key={course._id}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CourseShowcase data={course} />
                      </Grid>
                    ))}
                    {upcomingCourses.length > 3 && (
                      <Typography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                        }}
                        onClick={() => setShowAllCourses(true)}
                      >
                        Show more...
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            ) : (
              "Currrently no upcoming courses."
            )}
            <Typography variant="h6" gutterBottom>
              Past Courses
            </Typography>
            {pastCourses && pastCourses.length > 0 ? (
              <Grid
                container
                spacing={2}
                sx={{ width: "60%" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {showAllCourses ? (
                  pastCourses.map((course) => (
                    <Grid
                      item
                      md={12}
                      lg={6}
                      xl={4}
                      key={course._id}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CourseShowcase data={course} />
                    </Grid>
                  ))
                ) : (
                  <>
                    {pastCourses.slice(0, 3).map((course) => (
                      <Grid
                        item
                        md={12}
                        lg={6}
                        xl={4}
                        key={course._id}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CourseShowcase data={course} />
                      </Grid>
                    ))}
                    {pastCourses.length > 3 && (
                      <Typography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: theme.palette.primary.main,
                        }}
                        onClick={() => setShowAllCourses(true)}
                      >
                        Show more...
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            ) : (
              "No past courses to display."
            )}
            <Typography variant="h6" gutterBottom>
              {counter} Comments
            </Typography>
            {user && !user.trainer && (
              <CommentForm
                data={trainer}
                setCounter={setCounter}
                setCommentList={setCommentList}
              />
            )}
            <Box>
              {commentList?.length > 0
                ? commentList
                  .reverse()
                  .map((comment) => (
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
