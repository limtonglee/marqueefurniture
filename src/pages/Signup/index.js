import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signup from "../../services/Signup";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";


export default function SignUp() {
  let navigate = useNavigate();

  const [start, setStart] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    signup(
      data.get("username"),
      data.get("email"),
      data.get("phoneNumber"),
      data.get("password"),
      data.get("address")
    )
      .then((response) => {
        if(response.data.msg === "User successfully added") {
          setStart(true);
        }
        if(response.data.msg === "Username exists") {
          setUserNameError(true);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {!!userNameError && (
            <Alert severity="error">
              Username is already taken, try another username
            </Alert>
          )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={()=>setUserNameError(false)}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Phone No:"
                type="number"
                id="phoneNumber"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address Line:"
                type="string"
                id="address"
                autoComplete="address-line1"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Dialog open={start} onClose={() => setStart(false)}>
            <DialogContent>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Profile Created
                  </Typography>
                  <Typography component="h1" variant="subtitle1" sx={{ mt: 4 }}>
                    Welcome to Marquee Furniture!
                  </Typography>

                  <Box
                    component="form"
                    noValidate
                    // onSubmit={handleSubmits}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                      onClick={() => navigate("/login")}
                    >
                      Ok
                    </Button>
                  </Box>
                </Box>
              </Container>
            </DialogContent>
          </Dialog>

          <Grid
            container
            justifyContent="flex-end"
            sx={{
              marginTop: 4,
              marginBottom: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
