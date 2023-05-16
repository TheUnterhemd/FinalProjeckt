import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

// to Do: submit function
export default function CourseCreationForm() {
  const url = `${process.env.REACT_APP_SERVER_URL}/course/add`;
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [end, setEnd] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [maxStud, setMaxStud] = useState("");
  const [price, setPrice] = useState(0);
  const [ctype, setCtype] = useState("");

  async function postdata(formdata) {
    try {
      const result = await fetch(url, { method: "POST", body: formdata });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  function handleCourseSubmit(e) {
    e.preventDefault();

    const datestart = new Date(date);
    const dateend = new Date(end);
    const duration = (dateend - datestart) / (1000 * 60 * 60);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("location", location);
    formdata.append("maxStudents", maxStud);
    formdata.append("type", ctype);
    formdata.append("price", price);
    formdata.append("duration", duration);
    formdata.append("start", date);
    formdata.append("end", end);
    formdata.append("imgURL", imgURL);
    formdata.append("trainer", user._id);

    postdata(formdata);
  }

  function handleFileChange(e) {
    e.preventDefault();
    console.log(
      "e.target.files when changing file in courseCreation",
      e.target.files
    );
    setImgURL(e.target.files[0]);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          aria-required
          label="type"
          fullWidth
          multiline
          rows="4"
          name="type"
          id="type"
          placeholder="Course type"
          variant="filled"
          value={ctype}
          onChange={(e) => setCtype(e.target.value)}
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <TextField
          required
          type="datetime-local"
          aria-required
          label="start"
          fullWidth
          name="start"
          id="start"
          placeholder="Course startdate and time"
          variant="filled"
          focused
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          required
          type="datetime-local"
          aria-required
          label="end"
          fullWidth
          name="end"
          id="end"
          placeholder="Course enddate and time"
          variant="filled"
          focused
          value={end}
          onChange={(e) => setEnd(e.target.value)}
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
          onChange={(e) => handleFileChange(e)}
        />
        <TextField
          type="number"
          required
          aria-required
          label="max number of students"
          fullWidth
          name="maxStudents"
          id="maxStudents"
          placeholder="How many people do you want to participate max?"
          variant="filled"
          value={maxStud}
          onChange={(e) => setMaxStud(e.target.value)}
        />
        <TextField
          type="number"
          required
          aria-required
          label="Price in Euro"
          fullWidth
          name="price"
          id="price"
          placeholder="What is the price for the course? (in Euro) "
          variant="filled"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
