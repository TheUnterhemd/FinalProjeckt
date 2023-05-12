import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CommentCard({ data }) {
  const { user } = useContext(AuthContext);
  function handleCommentDeletion(e) {
    e.preventDefault();
    console.log("this will delete the comment in the future");
    console.log(data);
  }
  return (
    <>
      {data && (
        <Card sx={{ width: 300, maxWidth: 300, padding: 1 }}>
          <Box display="flex" justifyContent="space-between">
            <Avatar
              alt={`picture of ${data.userId}`}
              src={data.imgURL}
            ></Avatar>
            {user._id === data.userId && (
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
