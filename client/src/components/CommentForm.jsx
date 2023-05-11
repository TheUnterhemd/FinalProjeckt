import { Button, Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";

export default function CommentForm({ data, setCounter }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const url = "http://localhost:5002";
  const { putData } = useFetch(`${url}/trainer/update/${data._id}`, "PUT");

  function handleSubmit(e) {
    e.preventDefault();

    data.comments.unshift({
      userid: user._id,
      username: user.firstName,
      text: comment,
    });
    console.log("data.comments in commentForm", data.comments);
    const update = {
      courses: data.courses,
      likes: data.likes,
      comments: data.comments,
      adress: data.adress,
      profession: data.profession,
    };
    setCounter((prevCounter) => prevCounter + 1);
    putData(update);
    setComment("");
  }
  return (
    <Box component="form" onSubmit={(e) => handleSubmit(e)}>
      <TextField
        required
        aria-required
        id="filled-multiline-static"
        label="Comment"
        multiline
        rows={4}
        fullWidth
        name="comment"
        placeholder="Your comment here"
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
        Submit Comment
      </Button>
    </Box>
  );
}
