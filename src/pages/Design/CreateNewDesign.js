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
import { useStores } from "../../stores/RootStore";
import * as socket from "../../services/socket";

const CreateNewDesign = () => {
  const { userStore } = useStores();
  let navigate = useNavigate();
  const location = useLocation();
  console.log("location.state", location.state);

  const designOrderStatus = location.state
    ? location.state.designOrderStatus
    : null;

  console.log("designOrderStatus", designOrderStatus);

  const buyerId = location.state ? location.state.buyerId : null;
  const sellerId = location.state ? location.state.sellerId : null;
  console.log("buyerId", buyerId);
  console.log("sellerId", sellerId);

  const [otherComments, setOtherComments] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeOtherComments = (event) => {
    setOtherComments(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
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
  const createDesignAPI = async ({
    title,
    designImages,
    taggedListings,
    otherComments,
  }) => {
    console.log("98 designImages", designImages);
    try {
      const dateTime = new Date();
      const res = await designEngagementAPI.createDesignPackage(
        dateTime,
        title,
        designImages[0],
        designImages[1],
        designImages[2],
        otherComments,
        designOrderStatus.id
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("data", data);
      const packageId = JSON.parse(JSON.stringify(res)).data[0]["id"];
      console.log("packageId", packageId);

      for (let listingId in taggedListings) {
        console.log(`packageId listingId ${packageId} ${listingId}`);
        await createDesignListingsAPI(packageId, taggedListings[listingId]);
      }

      //refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  const updateDesignOrderStatusAPI = async (newStatus) => {
    console.log("updateDesignOrderStatusAPI");
    console.log(`buyerId sellerId ${buyerId} ${sellerId}`);
    try {
      const res = await designEngagementAPI.updateDesignOrderStatus(
        buyerId,
        sellerId,
        newStatus
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createDesignLogAPI = async (dateTime, description, role, orderId) => {
    console.log("createDesignLogAPI");
    try {
      const res = await designEngagementAPI.createDesignLog(
        dateTime,
        description,
        role,
        orderId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // todo: update
  const createDesignListingsAPI = async (packageId, listingId) => {
    console.log("createDesignListingsAPI");
    try {
      const res = await designEngagementAPI.createDesignListings(
        packageId,
        listingId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitDesign = async () => {
    console.log("handleSubmitDesign");

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
      title: title,
      designImages: designImages,
      taggedListings: selectedProductsValues.map((item) => parseInt(item.id)),
      otherComments: otherComments,
    });

    await createDesignAPI({
      title: title,
      designImages: designImages,
      taggedListings: selectedProductsValues.map((item) => parseInt(item.id)),
      otherComments: otherComments,
    });

    await updateDesignOrderStatusAPI("InReview");

    const timestamp = new Date();
    await createDesignLogAPI(
      timestamp,
      "Created design",
      "Designer",
      designOrderStatus.id
    );

    socket.bumpDesignOrderStatusRefresh(buyerId);

    // refreshDesignOrderStatus();
    navigate("/chat");

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
                  <Typography variant="h4" gutterBottom component="div">
                    Title
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    rows={4}
                    placeholder="Enter title"
                    sx={{ width: 500 }}
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </Box>
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
                    onClick={handleSubmitDesign}
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
