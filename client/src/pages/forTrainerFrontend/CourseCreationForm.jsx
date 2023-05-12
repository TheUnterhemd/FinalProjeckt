import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

// to Do: add missings states for the field, submit function, value={state} zu jedem Input(Textfield)
export default function CourseCreationForm() {
  const url = `${process.env.REACT_APP_SERVER_URL}/course/add`;
  const { postdata } = useFetch(url, "POST");
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setduration] = useState("");

  function handleCourseSubmit(e) {
    e.preventDefault();
    console.log("this will submit a new course");
  }
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ width: 500 }}
        onSubmit={(e) => handleCourseSubmit(e)}
      >
        <TextField
          required
          aria-required
          label="title"
          fullWidth
          name="title"
          id="title"
          placeholder="Course title"
          variant="filled"
        />
        <TextField
          required
          aria-required
          label="description"
          fullWidth
          multiline
          rows="4"
          name="description"
          id="description"
          placeholder="Course description"
          variant="filled"
        />
        <TextField
          required
          aria-required
          label="location"
          fullWidth
          name="location"
          id="location"
          placeholder="Course location"
          variant="filled"
        />
        <TextField
          type="number"
          inputProps={{ step: "0.5" }}
          required
          aria-required
          label="duration in hours"
          fullWidth
          name="duration"
          id="duration"
          placeholder="Course duration"
          variant="filled"
        />
        <TextField
          required
          type="date"
          aria-required
          label="date"
          fullWidth
          name="date"
          id="date"
          placeholder="Course date"
          variant="filled"
          focused
        />
        <TextField
          required
          type="time"
          aria-required
          label="start"
          fullWidth
          name="start"
          id="start"
          placeholder="Course start"
          variant="filled"
          focused
        />
        <TextField
          required
          accept=".jpeg, .jpg, .png"
          type="file"
          aria-required
          label="picture"
          fullWidth
          name="imgURL"
          id="picture"
          placeholder="Course picture"
          variant="filled"
          focused
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          Submit Course
        </Button>
      </Box>
    </Container>
  );
}
