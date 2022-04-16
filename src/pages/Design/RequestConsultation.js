import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import Autocomplete from "@mui/material/Autocomplete";

import Grid from "@mui/material/Grid";
import { useStores } from "../../stores/RootStore";
import * as socialMediaAPI from "../../services/SocialMedia";
import * as designEngagementAPI from "../../services/DesignEngagement";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const RequestConsultation = () => {
  const { userStore } = useStores();
  let navigate = useNavigate();
  const location = useLocation();

  // const [sellerId, setSellerId] = useState(null);

  const buyerId = userStore.id;
  const sellerId = location.state ? location.state.sellerId : null;
  // console.warn("sellerId", sellerId);

  // useEffect(() => {
  //   setSellerId(location.state ? location.state.sellerId : null);
  //   console.warn("sellerId", sellerId);
  // }, []);

  const [moodboardValues, setMoodboardValues] = useState([]);
  const [designValues, setDesignValues] = useState([]);
  const [otherComments, setOtherComments] = useState("");
  const [requestType, setRequestType] = useState("");

  // const moodboardTags = [{ id: 0, boardname: "Moodboard" }];
  const [moodboardTags, setMoodboardTags] = useState([]);

  const [designTags, setDesignTags] = useState([]);

  const getPostTags = async () => {
    try {
      const res = await socialMediaAPI.getAllTags();
      const data = JSON.parse(JSON.stringify(res)).data;

      const designTags = data.filter((item) => item.tagtype === "Design");
      setDesignTags(designTags);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostTags();
  }, []);

  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(userStore.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      // console.log("getUserMoodboards data", data);
      const cleaned = data.map((item) => {
        return { id: item.id, boardname: item.boardname };
      });
      // console.log("cleaned", cleaned);
      setMoodboardTags(cleaned);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserMoodboards();
  }, []);

  const handleChangeForMoodboardTags = (event, value) => {
    setMoodboardValues(value);
  };

  const handleChangeForDesignTags = (event, value) => {
    setDesignValues(value);
  };

  const handleChangeOtherComments = (event) => {
    setOtherComments(event.target.value);
  };

  const updateRequestType = (e) => {
    setRequestType(e.target.value);
  };

  const [roomRows, setRoomRows] = useState([
    { id: 1, roomSize: "", roomType: "" },
  ]);

  const updateRoomSize = (index, event) => {
    const newRoomRows = [...roomRows];
    newRoomRows[index].roomSize = event.target.value;
    setRoomRows(newRoomRows);
  };

  const updateRoomType = (index, event) => {
    const newRoomRows = [...roomRows];
    newRoomRows[index].roomType = event.target.value;
    setRoomRows(newRoomRows);
  };

  //! FILEE --------------------------------------------------
  //! FILEE --------------------------------------------------

  // const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileSelected = async (event) => {
    setIsLoading(true);
    // console.log("event.target.files", event.target.files);
    // const file = event.target.files[0];
    // console.log("file", file);
    // // setFile(file);

    // const result = await sendPictureToDbAPI(file);
    // console.log("file result", result);

    // if (result.image !== undefined) {
    //   setFile(result.image);
    // }

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

  //! FILEE --------------------------------------------------
  //! FILEE --------------------------------------------------

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

  const createDesignRequirementRoomAPI = async (
    roomSize,
    roomType,
    requirementId
  ) => {
    console.log(
      `createDesignRequirementRoomAPI roomSize roomType requirementId ${roomSize} ${roomType} ${requirementId}`
    );
    try {
      const res = await designEngagementAPI.createDesignRequirementRoom(
        roomSize,
        roomType,
        requirementId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createDesignRequirementTagsAPI = async (
    requirementId,
    requirementTagsId
  ) => {
    console.log(
      `createDesignRequirementTagsAPI requirementId requirementTagsId ${requirementId} ${requirementTagsId}`
    );
    try {
      const res = await designEngagementAPI.createDesignRequirementTags(
        requirementId,
        requirementTagsId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createDesignRequirementMbAPI = async (moodBoardId, requirementId) => {
    console.log(
      `createDesignRequirementMbAPI moodboardId requirementId ${moodBoardId} ${requirementId}`
    );
    try {
      const res = await designEngagementAPI.createDesignRequirementMb(
        moodBoardId,
        requirementId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // todo: create design order -> send sellerId, buyerId, datetime -> return designOrderId
  // todo: createDesignRequirementAPI to include designOrderId

  // wip
  const createDesignRequirementAPI = async (
    requestType,
    floorPlan,
    otherComments,
    designOrderId
  ) => {
    console.log("line 260 createDesignRequirementAPI");
    try {
      const res = await designEngagementAPI.createDesignRequirement(
        requestType,
        floorPlan[0],
        floorPlan[1],
        floorPlan[2],
        otherComments,
        userStore.id,
        designOrderId
      );
      const data = JSON.parse(JSON.stringify(res)).data[0]["id"];
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // wip
  const createDesignOrderAPI = async ({
    requestType,
    roomGeometry,
    floorPlan,
    styleRequests,
    moodboardReferences,
    otherComments,
  }) => {
    console.log("createDesignOrderAPI --------------");
    try {
      const timestamp = "2022-03-19 02:58:55.425662";
      const res = await designEngagementAPI.createDesignOrder(
        timestamp,
        buyerId,
        sellerId
      );
      console.log(
        "JSON.parse(JSON.stringify(res)).data",
        JSON.parse(JSON.stringify(res)).data
      );
      const designOrderId = JSON.parse(JSON.stringify(res)).data[0]["id"];
      console.log("designOrderId", designOrderId);

      const requirementId = await createDesignRequirementAPI(
        requestType,
        floorPlan,
        otherComments,
        designOrderId
      );
      console.log("requirementId", requirementId);

      for (let room in roomGeometry) {
        await createDesignRequirementRoomAPI(
          parseInt(roomGeometry[room].roomSize),
          roomGeometry[room].roomType,
          requirementId
        );
      }

      for (let requirementTagsId in styleRequests) {
        await createDesignRequirementTagsAPI(
          requirementId,
          styleRequests[requirementTagsId]
        );
      }

      for (let moodboardId in moodboardReferences) {
        await createDesignRequirementMbAPI(
          moodboardReferences[moodboardId],
          requirementId
        );
      }

      // todo: use the designorder id to create log
      await createDesignLogAPI(
        timestamp,
        "Requested for consultation",
        "Customer",
        designOrderId
      );

      // todo: update designorder status
      await updateDesignOrderStatusAPI("Requested");

      // todo: navigate back to chat
      navigate("/chat");

      //refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  /*
  // this will be changed to create design order 
  const createDesignRequirementAPI = async ({
    requestType,
    roomGeometry,
    floorPlan,
    styleRequests,
    moodboardReferences,
    otherComments,
  }) => {
    try {
      const res = await designEngagementAPI.createDesignRequirement(
        requestType,
        floorPlan[0],
        floorPlan[1],
        floorPlan[2],
        otherComments,
        userStore.id
      );
      const requirementId = JSON.parse(JSON.stringify(res)).data[0]["id"];
      console.log("requirementId", requirementId);

      for (let room in roomGeometry) {
        await createDesignRequirementRoomAPI(
          parseInt(roomGeometry[room].roomSize),
          roomGeometry[room].roomType,
          requirementId
        );
      }

      for (let requirementTagsId in styleRequests) {
        await createDesignRequirementTagsAPI(requirementId, requirementTagsId);
      }

      for (let moodboardId in moodboardReferences) {
        await createDesignRequirementMbAPI(moodboardId, requirementId);
      }

      // todo: get designorder id from the above processes

      // todo: use the designorder id to create log

      // todo: update designorder status

      // todo: navigate back to chat

      //refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };
  */

  const handleSubmit = () => {
    const styleRequests = designValues.map((item) => item["id"]);
    const moodboardReferences = moodboardValues.map((item) => item["id"]);

    let floorplan = [];
    if (files.length > 3) {
      floorplan = files.slice(3);
    } else if (files.length === 3) {
      floorplan = files;
    } else if (files.length == 2) {
      floorplan = [files, ""].flat();
    } else if (files.length == 1) {
      floorplan = [files, "", ""].flat();
    } else {
      floorplan = ["", "", ""];
    }

    const data = {
      requestType: requestType,
      roomGeometry: roomRows,
      floorPlan: floorplan,
      styleRequests: styleRequests,
      moodboardReferences: moodboardReferences,
      otherComments: otherComments,
    };
    // createDesignRequirementAPI(data);
    createDesignOrderAPI(data);
    console.log("submit data", data);
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
          <Grid item xs={12} md={8}>
            <Box sx={{ pt: 3, pb: 18 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h3" gutterBottom component="div">
                    Request for consultation
                  </Typography>
                  <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "normal" }}
                  >
                    Please enter your design requirements
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Request Type
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={requestType}
                      onChange={updateRequestType}
                    >
                      <FormControlLabel
                        value="designonly"
                        control={<Radio />}
                        label="Design Only"
                      />
                      <FormControlLabel
                        value="fulldesignandcoordination"
                        control={<Radio />}
                        label="Full Design and Coordination"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Geometry
                  </Typography>
                  <FormControl>
                    <Stack spacing={2}>
                      {roomRows.map((room, i) => (
                        <Box key={i}>
                          <Stack
                            direction="row"
                            spacing={3}
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Room {i + 1}
                            </Typography>
                            <Stack spacing={2}>
                              <Stack direction="row" spacing={2}>
                                <Box>
                                  <TextField
                                    id="outlined-textarea"
                                    placeholder="Enter area"
                                    type="number"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          sq ft
                                        </InputAdornment>
                                      ),
                                    }}
                                    value={room.roomSize}
                                    onChange={(event) =>
                                      updateRoomSize(i, event)
                                    }
                                  />
                                </Box>
                                <Box>
                                  <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Enter room type"
                                    value={room.roomType}
                                    onChange={(event) =>
                                      updateRoomType(i, event)
                                    }
                                  />
                                </Box>
                                {i !== 0 && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <CloseIcon
                                      name="close"
                                      onClick={() =>
                                        setRoomRows((cur) => [
                                          ...cur.slice(0, i),
                                          ...cur.slice(i + 1),
                                        ])
                                      }
                                    />
                                  </Box>
                                )}
                              </Stack>
                            </Stack>
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </FormControl>
                  <Box>
                    <Button
                      startIcon={<AddIcon />}
                      variant="outlined"
                      // onClick={() =>
                      //   setRoomRows((prev) => prev.concat([roomField]))
                      // }
                      onClick={() => {
                        const newRoomRows = [...roomRows];
                        newRoomRows.push({
                          id: Math.random(),
                          roomSize: "",
                          roomType: "",
                        });
                        setRoomRows((prev) => newRoomRows);
                      }}
                      sx={{ mt: 2 }}
                    >
                      Add another room
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" component="div">
                    Floor plan
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
                  {/* <Button variant="outlined" sx={{ height: 60, width: 80 }}>
                    <Box>
                      <UploadIcon fontSize="small" sx={{ mb: -1 }} />
                      Upload
                    </Box>
                  </Button> */}
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
                    Style Requests
                  </Typography>
                  <Autocomplete
                    value={designValues}
                    multiple
                    limitTags={2}
                    id="design-type"
                    options={designTags}
                    getOptionLabel={(option) => option.tagname}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Style requests"
                        placeholder="Search design style"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={handleChangeForDesignTags}
                    sx={{ width: 400 }}
                  />
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Moodboard References
                  </Typography>
                  <Autocomplete
                    value={moodboardValues}
                    multiple
                    limitTags={2}
                    id="room-type"
                    options={moodboardTags}
                    getOptionLabel={(option) => option.boardname}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Moodboard references"
                        placeholder="Search moodboard name"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === parseInt(value.id)
                    }
                    onChange={handleChangeForMoodboardTags}
                    sx={{ width: 400 }}
                  />
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
                <Box sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: 200 }}
                    onClick={handleSubmit}
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

export default RequestConsultation;
