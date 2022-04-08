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
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Login";
import { useStores } from "../../stores/RootStore";

const Login = () => {
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    login(data.get("email"), data.get("password"))
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.msg !== "Incorrect login info"
        ) {
          const user = response.data[0];
          setLogin(
            user.id,
            user.username,
            user.email,
            user.type,
            user.profilepic,
            user.address,
            user.bio
          );
        } else {
          console.log(response.data.msg);
          setIncorrectLogin(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // // on success set login
    // if (data.get("email") === "admin") {
    //   setAdminLogin();
    // } else {
    //   setLogin(data.get("email"));
  };

  const handleChange = (event) => {
    setIncorrectLogin(false);
  };

  /*
    const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };


    const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error('checkAuthenticated error: ', err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  */

  const { userStore } = useStores();

  let navigate = useNavigate();

  const setLogin = (id, username, email, type, profilepic, address, bio) => {
    userStore.setUserName(username);
    userStore.setId(id);
    userStore.setDescription(bio);
    userStore.setUserAddress(address);
    userStore.setProfilePic(profilepic);

    //to change set to seller
    if (type === "Seller") {
      userStore.setIsSeller();
    }
    if (type === "Admin") {
      userStore.setIsAdmin();
    }

    userStore.setIsLoggedIn();
    navigate("/marketplace");
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
          {!!incorrectLogin && (
            <Alert severity="error">
              Your account and/or password is incorrect, please try again
            </Alert>
          )}

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
              onChange={handleChange}
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
