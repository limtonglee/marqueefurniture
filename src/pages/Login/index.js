import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStores } from "../../stores/RootStore";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    //on success set login
    if (data.get("email") === "admin") {
      setAdminLogin();
    } else {
      setLogin(data.get("email"));
    }

    //on failure to do
  };

  const { userStore } = useStores();

  let navigate = useNavigate();

  const setLogin = (email) => {
    userStore.setIsLoggedIn();
    userStore.setUserName("Jack Mama");
    userStore.setDescription(
      "Hi, I’m Jack Mama. My mama used to say life is like a box of chocolates. But I like to see life like a piece of furniture. You never know what you're going to get. Unless you get it from Mama."
    );
    userStore.setUserWebLink("www.jackmama.com");

    navigate("/marketplace");
  };

  const setAdminLogin = () => {
    userStore.setIsLoggedIn();
    userStore.setUserName("admin");
    userStore.setIsAdmin();
    navigate("/admin");
  };

  return (
    <>
      <Container maxWidth="sm">
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
              <Grid item xs sx={{ mt: 3, mb: 5 }}>
                <Link to="/forgetpassword">Forgot password?</Link>
              </Grid>
              <Grid item sx={{ mt: 3, mb: 5 }}>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
