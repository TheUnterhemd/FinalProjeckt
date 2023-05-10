import { Avatar, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function CommentCard({ data }) {
  return (
    <>
      {data && (
        <Card sx={{ width: 250, maxWidth: 250 }}>
          <Avatar
            alt={`picture of ${data.firstName}`}
            src={data.imageURL}
          ></Avatar>
          <CardContent>
            <Typography variant="body1">{data.text}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
