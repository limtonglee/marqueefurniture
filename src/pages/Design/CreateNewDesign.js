import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  useNavigate,
  useNavigationType,
  useLocation,
  Link,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import * as socialMediaAPI from "../../services/SocialMedia";
import * as designEngagementAPI from "../../services/DesignEngagement";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TagProductsModal from "../SocialMedia/Posts/TagProductsModal";

const CreateNewDesign = () => {
  let navigate = useNavigate();

  const [otherComments, setOtherComments] = useState("");

  const handleChangeOtherComments = (event) => {
    setOtherComments(event.target.value);
  };

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileSelected = async (event) => {
    setIsLoading(true);

    const uploadedFiles = event.target.files;
    console.log("uploadedFiles", uploadedFiles);
    const newFiles = [];

    for (let i = 0; i < 3; i++) {
      const file = uploadedFiles[i];
      console.log("file", file);
      const result = await sendPictureToDbAPI(file);
      console.log("file result", result);

      if (result.image !== undefined) {
        newFiles.push(result.image);
      }
    }
    console.log(newFiles);
    setFiles(newFiles);

    setIsLoading(false);
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

  // todo: update
  // const createDesignAPI = async ({
  //   requestType,
  //   roomGeometry,
  //   floorPlan,
  //   styleRequests,
  //   moodboardReferences,
  //   otherComments,
  // }) => {
  //   try {
  //     const res = await designEngagementAPI.createDesignRequirement(
  //       requestType,
  //       floorPlan[0],
  //       floorPlan[1],
  //       floorPlan[2],
  //       otherComments,
  //       userStore.id
  //     );
  //     const requirementId = JSON.parse(JSON.stringify(res)).data[0]["id"];
  //     console.log("requirementId", requirementId);

  // const listingsToSubmit = selectedProductsValues.map((item) =>
  //   parseInt(item.id)
  // );
  // console.log("listings to submit", listingsToSubmit);

  //     for (let listingId in listingsToSubmit) {
  //       console.log(`newPostId listingId ${newPostId} ${listingId}`);
  //       await createDesignListingsAPI(newPostId, listingId);
  //     }

  //     //refreshData(); // function to refresh data?
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // todo: update
  // const createDesignListingsAPI = async (postId, listingId) => {
  //   try {
  //     const res = await socialMediaAPI.createPostListings(postId, listingId);
  //     const data = JSON.parse(JSON.stringify(res)).data;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmitReview = () => {
    console.log("handleSubmitReview");

    let designImages = [];
    if (files.length > 3) {
      designImages = files.slice(3);
    } else if (files.length === 3) {
      designImages = files;
    } else if (files.length == 2) {
      designImages = [files, ""].flat();
    } else if (files.length == 1) {
      designImages = [files, "", ""].flat();
    } else {
      designImages = ["", "", ""];
    }

    console.log("data to submit", {
      designImages: designImages,
      taggedListings: selectedProductsValues.map((item) => parseInt(item.id)),
      otherComments: otherComments,
    });

    // call API to submit
    // refer to Request for Consult + Create New Post
  };

  const [selectedProductsValues, setSelectedProductsValues] = useState([]);
  const [open, setOpen] = React.useState(false);

  const closeProductsModal = () => {
    setOpen(false);
  };

  const openProductsModal = (event) => {
    setOpen(true);
  };

  return (
    <>
      <TagProductsModal
        open={open}
        closeProductsModal={closeProductsModal}
        selectedProductsValues={selectedProductsValues}
        setSelectedProductsValues={setSelectedProductsValues}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={1}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ position: "fixed", backgroundColor: "white" }}
              size="small"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={11}>
            <Box sx={{ pt: 3, pb: 18 }}>
              <Typography variant="h3" gutterBottom component="div">
                New design
              </Typography>
              <Stack spacing={4} sx={{ mt: 4 }}>
                <Box>
                  <Typography variant="h4" component="div">
                    Design images
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      fontWeight: "normal",
                      mb: 1,
                      color: "primary.darker",
                    }}
                  >
                    Maximum of 3 photos
                  </Typography>
                  {files.length === 0 ? (
                    <>
                      {!isLoading && (
                        <Button
                          variant="outlined"
                          component="label"
                          fontSize="small"
                          sx={{
                            height: 60,
                            width: 80,
                            margin: "0 auto",
                          }}
                        >
                          <Box sx={{ mb: -0.5 }}>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <UploadIcon fontSize="small" />
                            </Box>
                            Upload
                          </Box>
                          <input
                            onChange={fileSelected}
                            type="file"
                            accept="image/*"
                            hidden
                            multiple
                          />
                        </Button>
                      )}
                      {isLoading && (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </>
                  ) : (
                    <>
                      {!isLoading && (
                        <>
                          <Stack direction="row" spacing={2}>
                            {files.map((file, i) => (
                              <Card
                                key={i}
                                sx={{
                                  width: 130,
                                  position: "relative",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  width="100%"
                                  objectfit="scale-down"
                                  image={`/api/image/${file}`}
                                  alt="post picture"
                                />
                              </Card>
                            ))}
                          </Stack>
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<UploadIcon />}
                            size="small"
                            sx={{ mt: 2 }}
                          >
                            Re-upload
                            <input
                              onChange={fileSelected}
                              type="file"
                              accept="image/*"
                              hidden
                            />
                          </Button>
                        </>
                      )}
                      {isLoading && (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: 500,
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
                        <span>Tag design with products</span>
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
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Other Comments
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder="Enter comment"
                    sx={{ width: 500 }}
                    value={otherComments}
                    onChange={handleChangeOtherComments}
                  />
                </Box>
                <Box sx={{ pt: 2 }}>
                  <Button
                    onClick={handleSubmitReview}
                    variant="contained"
                    size="large"
                    sx={{ width: 200 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateNewDesign;
