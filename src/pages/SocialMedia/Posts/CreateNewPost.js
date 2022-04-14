import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Autocomplete from "@mui/material/Autocomplete";
import TagProductsModal from "./TagProductsModal";
import { useNavigate } from "react-router-dom";
import * as socialMediaAPI from "../../../services/SocialMedia";
import { useStores } from "../../../stores/RootStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Input = styled("input")({
  display: "none",
});

const CreateNewPost = () => {
  // const [fileUploaded, setFileUploaded] = useState("");

  // const updateFile = (event) => {
  //   console.log(event.target.value);
  //   // setFileUploaded(event.target.value);
  //   setFileUploaded(
  //     "https://d1hy6t2xeg0mdl.cloudfront.net/image/483605/dd9938c2cc/standard"
  //   ); // mock only; for demo purpose
  // };

  const { userStore } = useStores();
  const [file, setFile] = useState("");

  const fileSelected = async (event) => {
    setIsLoading(true);

    const file = event.target.files[0];
    console.log("file", file);
    // setFile(file);

    const result = await sendPictureToDbAPI(file);
    console.log("file result", result);

    if (result.image !== undefined) {
      setFile(result.image);
    }
    setIsLoading(false);
  };

  const [selectedProductsValues, setSelectedProductsValues] = useState([]);
  const [boardDescription, setBoardDescription] = useState("");
  const [roomTags, setRoomTags] = useState([]);
  const [designTags, setDesignTags] = useState([]);
  const [filterRoomValues, setfilterRoomValues] = useState([]);
  const [filterDesignValues, setfilterDesignValues] = useState([]);

  const getPostTags = async () => {
    try {
      const res = await socialMediaAPI.getAllTags();
      const data = JSON.parse(JSON.stringify(res)).data;

      const roomTags = data.filter((item) => item.tagtype === "Room");
      const designTags = data.filter((item) => item.tagtype === "Design");

      setRoomTags(roomTags);
      setDesignTags(designTags);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostTags();
  }, []);

  const handleChangeForFilterRoom = (event, value) => {
    setfilterRoomValues(value);
  };

  const handleChangeForFilterDesign = (event, value) => {
    setfilterDesignValues(value);
  };

  const handleBoardDescription = (event) => {
    setBoardDescription(event.target.value);
  };

  const sendPictureToDbAPI = async (image) => {
    try {
      const res = await socialMediaAPI.sendPictureToDb(image);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createPostListingsAPI = async (postId, listingId) => {
    try {
      const res = await socialMediaAPI.createPostListings(postId, listingId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createPostTagsAPI = async (postId, postTagsId) => {
    try {
      const res = await socialMediaAPI.createPostTags(postId, postTagsId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createPostAPI = async (image, description, userId) => {
    try {
      const res = await socialMediaAPI.createPost(image, description, userId);
      const data = JSON.parse(JSON.stringify(res)).data[0]["id"];
      console.log(data);

      // await addPostToMoodboardAPI(post.id, data);

      //refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  let navigate = useNavigate();

  const createPost = async () => {
    console.log("createPost");
    // console.log(fileUploaded);
    // console.log(file);
    // console.log(selectedProductsValues);
    // console.log(filterRoomValues);
    // console.log(filterDesignValues);
    // console.log(boardDescription);

    const newPostId = await createPostAPI(file, boardDescription, userStore.id);

    const listingsToSubmit = selectedProductsValues.map((item) =>
      parseInt(item.id)
    );
    console.log("listings to submit", listingsToSubmit);

    for (let listingId in listingsToSubmit) {
      createPostListingsAPI(newPostId, listingId);
    }

    const roomsToSubmit = filterRoomValues.map((item) => item.id);
    const designsToSubmit = filterDesignValues.map((item) => item.id);
    const allTagsToSubmit = [roomsToSubmit, designsToSubmit].flat();
    console.log("all tags to submit", allTagsToSubmit);

    for (let tagId in allTagsToSubmit) {
      createPostTagsAPI(newPostId, tagId);
    }

    toast("Post created!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });

    // navigate(`/ideas/${newPostId}`);
  };

  const [open, setOpen] = React.useState(false);

  const closeProductsModal = () => {
    setOpen(false);
  };

  const openProductsModal = (event) => {
    setOpen(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ToastContainer />
      <Container sx={{ pt: 2 }}>
        <Box
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            New Post
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: 40,
            }}
            onClick={createPost}
          >
            Post
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              {file.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 350,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0F0F0",
                    borderRadius: 3,
                  }}
                >
                  {!isLoading && (
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<PhotoCamera />}
                      size="large"
                    >
                      Upload
                      <input
                        onChange={fileSelected}
                        type="file"
                        accept="image/*"
                        hidden
                      />
                    </Button>
                  )}
                  {isLoading && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
              ) : (
                <>
                  <Card
                    sx={{ width: "100%", position: "relative" }}
                    onClick={() => console.log("hi")}
                  >
                    <CardMedia
                      component="img"
                      width="100%"
                      objectfit="scale-down"
                      image={`/api/image/${file}`}
                      sx={{ opacity: isLoading ? 0.3 : 1 }}
                      alt="post picture"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        // transform: "(50%,-50%)",
                        // transform: `translate(${50}%, ${-50}%)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {!isLoading && (
                        <Button
                          variant="contained"
                          component="label"
                          startIcon={<PhotoCamera />}
                          size="large"
                        >
                          Re-upload
                          <input
                            onChange={fileSelected}
                            type="file"
                            accept="image/*"
                            hidden
                          />
                        </Button>
                      )}
                      {isLoading && (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </Box>
                  </Card>
                  {/* {!isLoading && (
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<PhotoCamera />}
                      size="large"
                    >
                      Re-upload
                      <input
                        onChange={fileSelected}
                        type="file"
                        accept="image/*"
                        hidden
                      />
                    </Button>
                  )}
                  {isLoading && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )} */}
                </>
              )}
            </Grid>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {selectedProductsValues.length === 0 ? (
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      width: "100%",
                      backgroundColor: "primary",
                    }}
                    onClick={openProductsModal}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span>Tag photo with products</span>
                      <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                  </Button>
                ) : (
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      width: "100%",
                      backgroundColor: "primary.lighter",
                      color: "primary.darker",
                      "&:hover": {
                        color: "#fff",
                      },
                    }}
                    onClick={openProductsModal}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span>{`Tagged with ${
                        selectedProductsValues.length
                      } product${
                        selectedProductsValues.length > 1 ? "s" : ""
                      }`}</span>

                      <ArrowForwardIosIcon fontSize="small" />
                    </Box>
                  </Button>
                )}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Board description
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  placeholder="Enter description..."
                  value={boardDescription}
                  onChange={handleBoardDescription}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Room type
                </Typography>
                <Autocomplete
                  value={filterRoomValues}
                  multiple
                  limitTags={2}
                  id="room-type"
                  options={roomTags}
                  getOptionLabel={(option) => option.tagname}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter by room type"
                      placeholder="Search room type"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={handleChangeForFilterRoom}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Interior design style
                </Typography>
                <Autocomplete
                  value={filterDesignValues}
                  multiple
                  limitTags={2}
                  id="design-type"
                  options={designTags}
                  getOptionLabel={(option) => option.tagname}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter by interior design style"
                      placeholder="Search design style"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={handleChangeForFilterDesign}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <TagProductsModal
        open={open}
        closeProductsModal={closeProductsModal}
        selectedProductsValues={selectedProductsValues}
        setSelectedProductsValues={setSelectedProductsValues}
      />
    </>
  );
};

export default CreateNewPost;
