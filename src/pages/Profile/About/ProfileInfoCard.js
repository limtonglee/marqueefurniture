// react-routers components
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../../stores/RootStore";

function ProfileInfoCard({
  title,
  description,
  website,
  userName,
  setUserName,
  setShopName,
}) {
  const [showEdit, setShowEdit] = useState(false);

  const { userStore } = useStores();

  let navigate = useNavigate();

  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const [bio, setBio] = useState(userStore.description);
  const [link, setLink] = useState(userStore.userWebLink);

  //handleSubmit not being called
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    userStore.setUserName(data.get("username"));
    setUserName(data.get("username"));
    userStore.setDescription(data.get("bio"));
    setBio(data.get("bio"));
    userStore.setUserWebLink(data.get("link"));
    setLink(data.get("link"));
    setShowEdit(!showEdit);
  };

  //this part is for the start selling form
  const [shopname, setShopname] = useState("");
  const [web, setWeb] = useState("");
  const [extract, setExtract] = useState("");
  const [shopnameError, setShopnameError] = useState(false);
  const [webError, setWebError] = useState(false);
  const [extractError, setExtractError] = useState(false);

  const handleSubmits = (event) => {
    event.preventDefault();

    setShopnameError(false);
    setWebError(false);
    setExtractError(false);

    if (shopname === "") {
      setShopnameError(true);
    }
    if (web === "") {
      setWebError(true);
    }
    if (extract === "") {
      setExtractError(true);
    }

    if (shopname && web && extract) {
      console.log(shopname, web, extract);
      navigate("/sellercenter");
    }
  };

  return (
    <>
      {!!showEdit && (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Card sx={{ height: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pt={2}
              px={2}
            >
              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {title}
              </Typography>
            </Box>

            <Box p={2}>
              <Box mb={2} lineHeight={1}>
                <TextField
                  variant="outlined"
                  id="username"
                  name="username"
                  defaultValue={userName}
                  required
                ></TextField>
              </Box>
              <Box opacity={0.3}>
                <Divider />
              </Box>

              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {description}
              </Typography>

              <Box mb={2} lineHeight={1}>
                <TextField
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={bio}
                  required
                  id="bio"
                  name="bio"
                ></TextField>
              </Box>

              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {website}
              </Typography>

              <Box mb={2} lineHeight={1}>
                <TextField
                  variant="outlined"
                  defaultValue={link}
                  required
                  id="link"
                  name="link"
                ></TextField>
              </Box>

              <Box>
                <Box display="flex" py={1} pr={2}></Box>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save
              </Button>

              <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                Cancel Changes
              </Button>
            </Box>
          </Card>
        </Box>
      )}
      {!showEdit && (
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Card sx={{ height: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pt={2}
              px={2}
            >
              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {title}
              </Typography>
            </Box>

            <Box p={2}>
              <Box mb={2} lineHeight={1}>
                <Typography variant="button" color="text" fontWeight="regular">
                  {userName}
                </Typography>
              </Box>
              <Box opacity={0.3}>
                <Divider />
              </Box>

              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {description}
              </Typography>

              <Box mb={2} lineHeight={1}>
                <Typography variant="button" color="text" fontWeight="regular">
                  {bio}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {website}
              </Typography>

              <Box mb={2} lineHeight={1}>
                <Typography variant="button" color="text" fontWeight="regular">
                  {link}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              >
                Edit Profile
              </Button>

              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleStart}
              >
                Start Selling
              </Button>
              <Dialog open={start} onClose={handleStop}>
                <DialogContent>
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
                        Create Shop Profile
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmits}
                        sx={{ mt: 10 }}
                      >
                        <Grid container spacing={2}>
                          <Typography variant="h6">Shop Name</Typography>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              onChange={(e) => setShopname(e.target.value)}
                              id="shopname"
                              label="Shop Name"
                              name="shopname"
                              autoComplete="shopname"
                              error={shopnameError}
                              helperText={shopnameError && "Shop name required"}
                            />
                          </Grid>
                          <Typography variant="h6" mt={5}>
                            Shop Website
                          </Typography>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              onChange={(e) => setWeb(e.target.value)}
                              id="website"
                              label="Shop Website"
                              name="website"
                              autoComplete="website"
                              error={webError}
                              helperText={webError && "Shop website required"}
                            />
                          </Grid>
                          <Typography variant="h6" mt={5}>
                            Shop Description
                          </Typography>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              multiline
                              rows={4}
                              onChange={(e) => setExtract(e.target.value)}
                              name="description"
                              label="Shop Description"
                              id="description"
                              autoComplete="description"
                              error={extractError}
                              helperText={
                                extractError && "Shop description required"
                              }
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 5, mb: 8 }}
                        >
                          Sign Up
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleStop}>Cancel</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileInfoCard;
