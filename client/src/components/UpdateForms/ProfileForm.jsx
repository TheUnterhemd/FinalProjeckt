import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";

function ProfileForm({ setEdit }) {
  const { user, dispatch } = useContext(AuthContext);
  const [endpoint, setEndpoint] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgURL, setImgURL] = useState();
  const [profession, setProfession] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");

  useEffect(() => {
    user.trainer ? setEndpoint("trainer") : setEndpoint("user");
  }, [user.trainer]);

  // user und trainer haben folgende relevante keys gemeinsam:
  // firstName
  // lastName
  // address
  // email
  // imgURL
  // comments

  // user extra: bookedCourses, solvedCourses, interests
  // trainer extra: courses profession

  function handleSubmit(e) {
    e.preventDefault();
    postData({ firstName, lastName, imgURL, street, postalCode, city });
    /* console.log(
      "this will submit the updated profiledata to database and dispatch with the returned user to update context"
    ); */
  }

  const postData = async ({
    firstName,
    lastName,
    imgURL,
    street,
    postalCode,
    city,
  }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("imgURL", imgURL);
      /* formData.append(
        "address",
        JSON.stringify({ street: street, code: postalCode, city: city })
      ); */
      formData.append("street", street);
      formData.append("city", city);
      formData.append("postalCode", postalCode);
      if (profession) {
        formData.append("profession", profession);
      }
      if (interests) {
        formData.append("interests", interests);
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/${endpoint}/update/${user._id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const data = await response.json();
      dispatch({ type: "LOGIN", payload: data.user });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{ width: 500, mx: "auto", my: 1 }}
      onSubmit={handleSubmit}
    >
      {user.address === undefined && <Alert severity="warning">Please add an address to your profile!</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            fullWidth
            id="firstName"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
            fullWidth
            name="Street + No"
            label="Street + No."
            type="text"
            onChange={(e) => setStreet(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="Postal Code"
            label="Postal Code"
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="City"
            label="City"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
        {user.trainer ? (
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="profession"
              label="Profession"
              type="text"
              id="profession"
              onChange={(e) => setProfession(e.target.value)}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="interests"
              label="Interests"
              type="text"
              onChange={(e) => setInterests(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1, mb: 1 }}>
        Submit changes
      </Button>
    </Box>
  );
}

export default ProfileForm;
