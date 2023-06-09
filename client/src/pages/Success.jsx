import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  useEffect(() => {
    setTimeout(() => navigate(`/course/${id}`), 1000);
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3">Course successfully updated!</Typography>
    </Box>
  );
}
