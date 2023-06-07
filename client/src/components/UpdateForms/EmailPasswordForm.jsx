import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function EmailPasswordForm() {
  const { user } = useContext(AuthContext);
  const [endpoint, setEndpoint] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    user.trainer ? setEndpoint("trainer") : setEndpoint("user");
  }, [user.trainer])

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({ email, currentPassword, newPassword })
    console.log(
      "this will submit the updated profiledata to database and dispatch with the returned user to update context"
    );
  }

  const postData = async ({ email, currentPassword, newPassword }) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    }

    try {
      const response = await fetch(`http://localhost:5002/${endpoint}/update/${user._id}`, options);

      const data = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ width: 800, mx: "auto", my: 1 }}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="current password"
                fullWidth
                label="Current Password"
                type="password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="new password"
                fullWidth
                label="New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="repeat password"
                fullWidth
                label="Repeat New Password"
                type="password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {
                newPassword !== repeatPassword ? (
                  <>
                    <Typography>Passwords do not match!</Typography>
                    <Button disabled type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
                      Update Password
                    </Button>
                  </>
                ) : (
                  <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
                    Update Password
                  </Button>
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="new email"
                fullWidth
                label="New Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="current password"
                fullWidth
                label="Current Password"
                type="password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
                Update Email
              </Button>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );
}

export default EmailPasswordForm;
