import { Button, Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { update } from "../hooks/update";
export default function CommentForm({ data, setCounter, setCommentList }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const url = process.env.REACT_APP_SERVER_URL;

  /** submits comment to database, updates comment array on TrainerDetailpage and increases commentCounter */
  async function handleCommentSubmit(e) {
    e.preventDefault();
    const updateObj = { body: comment, trainerId: data._id, userId: user._id };
    try {
      const result = await update(
        `${url}/comment/add/`,
        updateObj,
        user.accessToken,
        "POST"
      );
      if (result.error) {
        throw new Error("could not add comment");
      }

      setCommentList((prevCommentList) => {
        const temp = prevCommentList;
        temp.push(result.populatedComment);
        return temp;
      });
    } catch (err) {
      console.log("error in handleCommentSubmit", err);
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
