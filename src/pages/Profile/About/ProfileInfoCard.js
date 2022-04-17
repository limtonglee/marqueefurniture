// react-routers components
import { Container, Typography } from "@mui/material";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import axios from "axios";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";
import { useStores } from "../../../stores/RootStore";
import { StartSellingDialog } from "./StartSellingDialog";

import CircularProgress from "@mui/material/CircularProgress";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function updateProfile({ image, userId, bio, userName, address }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("userId", userId);
  formData.append("bio", bio);
  formData.append("userName", userName);
  formData.append("address", address);

  const result = await axios.post(
    "http://localhost:8080/api/profile/edit",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return result.data;
}

function ProfileInfoCard({
  title,
  description,
  website,
  userName,
  setUserName,
  setShopName,
  setProfilePic,
}) {
  const { userStore } = useStores();
  const [showEdit, setShowEdit] = useState(false);
  const [bio, setBio] = useState(userStore.description);
  const [address, setAddress] = useState(userStore.address);
  const [start, setStart] = useState(false);
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userId = userStore.id;

  const notifySubmit = () =>
    toast("Profile updated!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleStart = () => {
    setStart(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setIsLoading(true);

    const result = await updateProfile({
      image: file,
      userId,
      bio: data.get("bio"),
      userName: data.get("username"),
      address: data.get("address"),
    });

    if (result.profilePic !== null) {
      setProfilePic(result.profilePic);

      userStore.setProfilePic(result.profilePic);
    }

    if (result.msg === "User have successfully updated profile!") {
      notifySubmit();
      userStore.setUserName(data.get("username"));
      setUserName(data.get("username"));
      userStore.setDescription(data.get("bio"));
      setBio(data.get("bio"));
      userStore.setUserAddress(data.get("address"));
      setAddress(data.get("address"));
    }
    setIsLoading(false);
    setShowEdit(!showEdit);
  };

  return (
    <>
      <Container maxWidth="md">
        {!!showEdit && (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  Profile Pic
                </Typography>
              </Box>
              <Box ml={2} mb={2} lineHeight={1}>
                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                ></input>
              </Box>

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
                    minRows={1}
                    maxRows={4}
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
                    defaultValue={address}
                    required
                    id="address"
                    name="address"
                  ></TextField>
                </Box>
              </Box>

              <Box
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Save
                </Button>
                {!!isLoading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}

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
                  <Typography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                  >
                    {userName}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {description}
                </Typography>

                <Box mb={2} lineHeight={1}>
                  <Typography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                  >
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
                  <Typography
                    variant="button"
                    color="text"
                    fontWeight="regular"
                  >
                    {address}
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
                {!userStore.isSeller && !userStore.isDesigner && (
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleStart}
                  >
                    Start Selling
                  </Button>
                )}
              </Box>
            </Card>
          </Box>
        )}
        <ToastContainer />
        {!userStore.isSeller && !userStore.isDesigner && (
          <StartSellingDialog
            start={start}
            setStart={setStart}
            setShopName={setShopName}
          ></StartSellingDialog>
        )}
      </Container>
    </>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileInfoCard;
