// ToDo:
// Anzeige von Teilnehmenden, wenn es denn schon welche gibt.
// vor Deploy: setTrainer entfernen und Context für Trainer einbinden.
// beim Delete sollte das der course auch beim Trainer gelöscht werden.

import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";

export default function CourseCreationForm({ course }) {
  // const { user } = useContext(AuthContext);

  // to get a default trainer
  const id = "645e3d2cb9b348b3386b51d6";
  const { data: defaultTrainer } = useFetch(
    `http://localhost:5002/trainer/${id}`
  );
  const [trainer, setTrainer] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [end, setEnd] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [maxStud, setMaxStud] = useState("");
  const [price, setPrice] = useState(0);
  const [ctype, setCtype] = useState("");
  const [error, setError] = useState("");
  const [currStud, setCurrStud] = useState("");
  const [endpoint, setEndpoint] = useState("add");
  const [method, setMethod] = useState("POST");
  const today = new Date();
  const url = `${process.env.REACT_APP_SERVER_URL}/course/${endpoint}`;

  // loads course data, if provided. turns form into course update form AND SETS DEFAULT TRAINER FOR TESTING
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setLocation(course.location);
      setDate(course.start);
      setEnd(course.end);
      setImgURL(course.imgURL);
      setMaxStud(course.Students);
      setCurrStud(course.currentStudents);
      setPrice(course.price);
      setCtype(course.type);
      setEndpoint(`update/${course._id}`);
      setMethod("PUT");
    }
    if (defaultTrainer) {
      setTrainer(defaultTrainer.trainer);
    }
  }, [defaultTrainer, course]);

  async function updateTrainer(json) {
    try {
      console.log("running updateTrainer");
      const temp = trainer.courses.map((course) => course._id);
      temp.push(json.course._id);
      const result = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/trainer/update/${trainer._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courses: temp }),
        }
      );
      const resTrainer = await result.json();
      setTrainer(resTrainer.trainer);
    } catch (err) {
      console.log(err);
    }
  }
  /** sends formdata to backend  */
  async function postdata(formdata) {
    console.log("running postdata");

    try {
      const result = await fetch(url, { method: method, body: formdata });
      const json = await result.json();
      if (method === "POST") {
        updateTrainer(json);
      }
      console.log(json.course);
    } catch (err) {
      console.log(err);
    }
  }
  /** calculates the duration from start to end, submits the entered data as formdata/multipart */
  function handleCourseSubmit(e) {
    e.preventDefault();
    console.log("handling submit");

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
    formdata.append("trainer", trainer._id);
    if (currStud) {
      formdata.append("currentStudents", currStud);
    }
    postdata(formdata);
  }
  /** checks filesize from Input and sets the ImgURL state to the file */
  function handleFileChange(e) {
    e.preventDefault();
    const size = e.target.files[0].size / 1024 ** 2;
    if (size > 1) {
      setError("Picture must be smaller than 1MB");
    } else {
      setError("");
      setImgURL(e.target.files[0]);
    }
  }

  //function for testing only
  function displaydata() {
    console.log("today", today.toISOString().substring(0, 16));
    console.log("date", date);
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
      <Button onClick={(e) => displaydata(e)}>Display</Button>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ width: 500 }}
        onSubmit={(e) => handleCourseSubmit(e)}
      >
        <Typography variant="h3">
          {course ? "Update your course" : "Create a Course"}
        </Typography>
        {error && <Alert severity="error"> {error}</Alert>}
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
          inputProps={{
            min: today.toISOString().substring(0, 16),
            max: end ? end : null,
          }}
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
          inputProps={{ min: date }}
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
          inputProps={{ accept: "image/jpeg, image/jpg, image/png" }}
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
          inputProps={{ min: 1, max: 100 }}
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
          inputProps={{ min: 0, max: 500 }}
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
