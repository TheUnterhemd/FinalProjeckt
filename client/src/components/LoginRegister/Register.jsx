import { useContext, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = ({ setLogin, close }) => {
  const { dispatch } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgURL, setImgURL] = useState();
  // as long as there is only one Frontend: State to check if
  // sb wants to register as trainer, then the URL in
  // postData will be changed
  const [endpoint, setEndpoint] = useState("user");

  const [profession, setProfession] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    postData({ firstName, lastName, email, password, imgURL });
  };

  const postData = async ({ firstName, lastName, email, password, imgURL }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("imgURL", imgURL);
      if (profession) {
        formData.append("profession", profession);
      }

      const response = await fetch(
        `http://localhost:5002/${endpoint}/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("data in register", data);
      dispatch({ type: "LOGIN", payload: data.user });
    } catch (error) {
      console.log(error);
    } finally {
      close();
      navigate("/user");
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleRegister}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                accept=".jpeg, .jpg, .png"
                name="file"
                label="Profile Picture"
                type="file"
                id="file"
                onChange={(e) => setImgURL(e.target.files[0])}
                focused
              />
            </Grid>
            {endpoint === "trainer" && (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="profession"
                  label="Profession"
                  type="text"
                  id="profession"
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Grid>
            )}
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                inputProps={{
                  "aria-label": "Check if you want to sign up as trainer",
                }}
                onChange={() => {
                  endpoint === "user"
                    ? setEndpoint("trainer")
                    : setEndpoint("user");
                }}
              />
            }
            label="I'm a trainer"
          ></FormControlLabel>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={setLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Register;
