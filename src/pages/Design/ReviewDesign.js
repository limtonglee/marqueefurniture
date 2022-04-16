import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import DesignItemCard from "./DesignItemCard";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import * as socialMediaAPI from "../../services/SocialMedia";
import * as designEngagementAPI from "../../services/DesignEngagement";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const ReviewDesign = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const design = location.state ? location.state.design : null;
  const designOrderStatus = location.state
    ? location.state.designOrderStatus
    : null;
  const buyerId = location.state ? location.state.buyerId : null;
  const sellerId = location.state ? location.state.sellerId : null;

  console.log("design", design);

  const [otherComments, setOtherComments] = useState("");
  const [isCompleted, setIsCompleted] = useState("");

  const handleChangeOtherComments = (event) => {
    setOtherComments(event.target.value);
  };

  const updateIsCompleted = (e) => {
    setIsCompleted(e.target.value);
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

  const createDesignLogAPI = async (dateTime, description, role, orderId) => {
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

  const updateDesignOrderStatusAPI = async (newStatus) => {
    console.log(
      `updateDesignOrderStatusAPI buyerId sellerId ${buyerId} ${sellerId}`
    );
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

  const createDesignReviewAPI = async ({
    designPackageId,
    photoReviews,
    userOtherComment,
    isCompleted,
  }) => {
    console.log("line 260 createDesignRequirementAPI");
    try {
      const res = await designEngagementAPI.createDesignReview(
        designPackageId,
        photoReviews[0],
        photoReviews[1],
        photoReviews[2],
        userOtherComment,
        isCompleted
      );
      const data = JSON.parse(JSON.stringify(res)).data[0]["id"];

      const timestamp = new Date();

      if (isCompleted === "1") {
        // todo: use the designorder id to create log
        await createDesignLogAPI(
          timestamp,
          "Approved design",
          "Customer",
          designOrderStatus.id
        );

        // todo: update designorder status
        await updateDesignOrderStatusAPI("Completed");
      } else {
        // todo: use the designorder id to create log
        await createDesignLogAPI(
          timestamp,
          "Rejected design",
          "Customer",
          designOrderStatus.id
        );

        // todo: update designorder status
        await updateDesignOrderStatusAPI("Rejected");
      }

      // todo: navigate back to chat
      navigate("/chat");

      // return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReview = () => {
    console.log("handleSubmitReview");

    let photoReviews = [];
    if (files.length > 3) {
      photoReviews = files.slice(3);
    } else if (files.length === 3) {
      photoReviews = files;
    } else if (files.length == 2) {
      photoReviews = [files, ""].flat();
    } else if (files.length == 1) {
      photoReviews = [files, "", ""].flat();
    } else {
      photoReviews = ["", "", ""];
    }

    console.log("data to submit", {
      designPackageId: design.id,
      photoReviews: photoReviews,
      userOtherComment: otherComments,
      isCompleted: isCompleted,
    });

    createDesignReviewAPI({
      designPackageId: design.id,
      photoReviews: photoReviews,
      userOtherComment: otherComments,
      isCompleted: isCompleted,
    });
    // call API to submit
  };

  return (
    <>
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
                Review Design
              </Typography>
              <Box sx={{ width: "100%", mt: 3 }}>
                <DesignItemCard design={design} hideButton={true} />
              </Box>
              <Stack spacing={4} sx={{ mt: 4 }}>
                <Box>
                  <Typography variant="h4" component="div">
                    Picture comments
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
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Other Comments
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder="Enter comment"
                    sx={{ width: 400 }}
                    value={otherComments}
                    onChange={handleChangeOtherComments}
                  />
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Do you approve this design?
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={isCompleted}
                      onChange={updateIsCompleted}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
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
      {/* <Box
        sx={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "white",
          width: "100%",
          boxShadow: 3,
          borderRadius: "30px 30px 0 0",
          px: 4,
          py: 3.5,
          zIndex: 99,
        }}
      >
        <Button variant="contained" size="large" sx={{ width: "100%" }}>
          Submit
        </Button>
      </Box> */}
    </>
  );
};

export default ReviewDesign;
