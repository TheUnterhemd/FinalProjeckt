// ToDo:
// Anzeige von Teilnehmenden, wenn es denn schon welche gibt.
// löschen von einzelnen Teilnehmenden, aktualisieren von currentStudents

import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import MapTest from "../../components/map/Map";
import { useNavigate } from "react-router-dom";
import { update } from "../../hooks/update";

export default function CourseCreationForm({ course, setEdit }) {
  const { user, dispatch } = useContext(AuthContext);

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
  const [online, setOnline] = useState(true);
  const url = `${process.env.REACT_APP_SERVER_URL}/course/${endpoint}`;

  const navigate = useNavigate();
  const today = new Date();

  // loads course data, if provided
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setLocation(course.location);
      setDate(course.start);
      setEnd(course.end);
      setImgURL(course.imgURL);
      setMaxStud(course.maxStudents);
      setCurrStud(course.currentStudents);
      setPrice(course.price);
      setCtype(course.type);
      setEndpoint(`update/${course._id}`);
      setMethod("PUT");
    }
  }, [user, course]);

  /** submits the entered data as formdata/multipart */
  function handleCourseSubmit(e) {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("location", JSON.stringify(location));
    formdata.append("maxStudents", maxStud);
    formdata.append("type", ctype);
    formdata.append("price", price);
    formdata.append("duration", calculateDuration());
    formdata.append("start", date);
    formdata.append("end", end);
    formdata.append("imgURL", imgURL);
    formdata.append("trainer", user._id);

    if (currStud) {
      formdata.append("currentStudents", currStud);
    }
    postdata(formdata);
  }
  /** calculates the duration from start to end */
  function calculateDuration() {
    const datestart = new Date(date);
    const dateend = new Date(end);
    const duration = (dateend - datestart) / (1000 * 60 * 60);
    return duration;
  }
  /** posts formdata to server-url  */
  async function postdata(formdata) {
    try {
      const result = await fetch(url, {
        method: method,
        headers: { authorization: `Bearer ${user.accessToken}` },
        body: formdata,
      });
      if (!result.ok) {
        throw new Error("could not post course");
      }
      const json = await result.json();
      if (method === "POST") {
        updateTrainer(json);
      }
      navigate(`/course/${json.course._id}`);
      if (setEdit) setEdit(false);
    } catch (err) {
      console.log("error while posting:", err);
    }
  }
  /**handles the update of the trainer to post the new course array on database */
  async function updateTrainer(json) {
    try {
      const temp = user.courses.map((course) => course._id) || [];
      temp.push(json.course._id);
      const result = await update(
        `${process.env.REACT_APP_SERVER_URL}/trainer/update/${user._id}`,
        { courses: temp },
        user.accessToken
      );
      dispatch({ type: "LOGIN", payload: result.trainer });
    } catch (err) {
      console.log("error in CourseCreationForm:updateTrainer", err);
    }
  }

  /** checks filesize from Input and sets the ImgURL state to file */
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

  function handleClick() {
    console.log("chip clicked");
  }
  function handleDelete(id) {
    console.log("chip deleted");
    // setCurrStud((prevCurrStud) =>
    //   prevCurrStud.filter((student) => student._id !== id)
    // );
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
          focused
          required
          aria-required
          label="location"
          fullWidth
          disabled={online}
          name="location"
          id="location"
          variant="filled"
          value={location.location}
          onChange={(e) =>
            setLocation({ location: e.target.value, description: "online" })
          }
          defaultValue="click on the map where you want to meet or insert link"
        />

        <FormControlLabel
          control={
            <Checkbox
              inputProps={{ "aria-label": "Course is online" }}
              onChange={() => setOnline(!online)}
            />
          }
          label="Course is online"
        />
        {online && (
          <Box>
            <MapTest markerOptions={{ setLocation, data: [course] }} />
          </Box>
        )}
        <TextField
          required
          inputProps={{
            min: today.toISOString().substring(0, 16),
            max: end ? end : null,
          }}
          type="datetime-local"
          aria-required
          label="Startdate, Startingtime"
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
          label="Enddate, Endingtime"
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
        {currStud &&
          currStud.map((student) => (
            <Box key={student._id}>
              <Typography variant="body2">Current Participants</Typography>
              <Chip
                avatar={<Avatar src={student.imgURL}></Avatar>}
                label={student.firstName}
                onClick={handleClick}
                onDelete={() => handleDelete(student._id)}
              ></Chip>
            </Box>
          ))}
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
