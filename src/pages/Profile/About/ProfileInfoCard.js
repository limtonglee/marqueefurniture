// react-routers components
import { Typography } from "@mui/material";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useStores } from "../../../stores/RootStore";
import { StartSellingDialog } from "./StartSellingDialog";

import axios from "axios";
import editProfile, { getImage } from "../../../services/Profile";

async function postImage({ image, desc }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("desc", desc);
  const result = await axios.post(
    "http://localhost:8080/api/images",
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
}) {
  const [showEdit, setShowEdit] = useState(false);

  const { userStore } = useStores();

  const [bio, setBio] = useState(userStore.description);
  const [link, setLink] = useState(userStore.userWebLink);

  const [start, setStart] = useState(false);

  const [file, setFile] = useState();
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleStart = () => {
    setStart(true);
  };

  //handleSubmit not being called
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const result = await postImage({ image: file, desc });

    setImages([result.imagePath, ...images]);

    userStore.setUserName(data.get("username"));
    setUserName(data.get("username"));
    userStore.setDescription(data.get("bio"));
    setBio(data.get("bio"));
    userStore.setUserWebLink(data.get("link"));
    setLink(data.get("link"));
    setShowEdit(!showEdit);
  };

  useEffect(() => {
    getImage().then((response) => {
      console.log("response");
      console.log(response.data);
    });
  }, []);

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

            <input onChange={fileSelected} type="file" accept="image/*"></input>
            <input
              value={desc}
              name="image"
              onChange={(e) => setDesc(e.target.value)}
              type="text"
            ></input>

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
            {/* {images.map((image) => (
              <div key={image}>
                <img src={image}></img>
              </div>
            ))} */}
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
            </Box>
          </Card>
        </Box>
      )}

      <StartSellingDialog
        start={start}
        setStart={setStart}
        setShopName={setShopName}
      ></StartSellingDialog>
    </>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileInfoCard;
