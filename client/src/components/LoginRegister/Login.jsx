import { useContext, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
/* import { useNavigate } from 'react-router-dom'; */

const Login = ({ setReg, close, setWarningToast }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // endpoint is used to switch between users and trainers logging in
  const [endpoint, setEndpoint] = useState("user");
  const [remember, setRemember] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    postData({ email, password });
  };

  const postData = async ({ email, password }) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    if (remember) {
      options.credentials = "include";
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/${endpoint}/login`,
        options
      );

      if (response.status === 401) {
        await handleWarning();
      }

      const data = await response.json();
      console.log(data);
      dispatch({ type: "LOGIN", payload: data.user });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/user");
      close();
    }
  };

  const handleWarning = async () => {
    setWarningToast(true);
  }

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e) => setRemember(!remember)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" variant="body2" onClick={setReg}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
