import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CommentCard({ data, setCommentList, setCounter }) {
  const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_SERVER_URL}/comment/delete/${data._id}`;

  /** deletes comment from database and from current comments array */
  async function handleCommentDeletion(e) {
    e.preventDefault();
    await fetch(url, {
      method: "DELETE",
      headers: { authorization: `Bearer ${user.accessToken}` },
    });
    setCommentList((prevCommentList) => {
      const result = prevCommentList;
      result.splice(
        result.findIndex((comment) => comment._id === data._id),
        1
      );
      return result;
    });
    setCounter((prevCounter) => prevCounter - 1);
  }
  return (
    <>
      {data && (
        <Card
          sx={{
            width: 300,
            maxWidth: 300,
            padding: 1,
            mt: 1,
            boxShadow: "0px 2px 10px 0px #145191",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Avatar
              alt={`picture of ${data.userId}`}
              src={data.imgURL}
            ></Avatar>
            {user && user._id === data.userId._id && (
              <DeleteIcon
                onClick={(e) => handleCommentDeletion(e)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Box>
          <CardContent>
            <Typography variant="body1">{data.body}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
