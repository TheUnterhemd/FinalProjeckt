import { Button, Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";

export default function CommentForm({ data, setCounter, comments }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const url = process.env.REACT_APP_SERVER_URL;

  /** submits comment to database, updates comment array on TrainerDetailpage and increases commentCounter */
  async function handleCommentSubmit(e) {
    e.preventDefault();
    const update = { body: comment, trainerId: data._id, userId: user._id };
    try {
      const result = await fetch(`${url}/comment/add/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      const json = await result.json();
      comments.push(json.comment);
    } catch (err) {
      console.log("error", err);
    }
    setCounter((prevCounter) => prevCounter + 1);
    setComment("");
  }
  return (
    <Box component="form" onSubmit={(e) => handleCommentSubmit(e)}>
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
