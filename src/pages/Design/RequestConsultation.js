import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
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

const RequestConsultation = () => {
  const { userStore } = useStores();
  let navigate = useNavigate();

  const [moodboardValues, setMoodboardValues] = useState([]);
  const [designValues, setDesignValues] = useState([]);
  const [otherComments, setOtherComments] = useState("");
  const [requestType, setRequestType] = useState("");

  // const moodboardTags = [{ id: 0, boardname: "Moodboard" }];
  const [moodboardTags, setMoodboardTags] = useState([]);

  const designTags = [
    { id: 0, title: "Art Deco" },
    { id: 1, title: "Asian Zen" },
    { id: 2, title: "Bohemian" },
    { id: 3, title: "Coastal" },
    { id: 4, title: "Contemporary" },
    { id: 5, title: "Eclectic" },
    { id: 6, title: "French Country" },
    { id: 7, title: "Industrial" },
    { id: 8, title: "Meditarranean" },
    { id: 9, title: "Minimalist" },
    { id: 10, title: "Modern" },
    { id: 11, title: "Modern Farmhouse" },
    { id: 12, title: "Rustic" },
    { id: 13, title: "Scandinavian" },
    { id: 14, title: "Shabby Chic" },
    { id: 15, title: "Traditional" },
    { id: 16, title: "Transitional" },
  ];

  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(userStore.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("getUserMoodboards data", data);
      const cleaned = data.map((item) => {
        return { id: item.id, boardname: item.boardname };
      });
      console.log("cleaned", cleaned);
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
    console.log("roomRows", roomRows);
    const newRoomRows = [...roomRows];
    newRoomRows[index].roomSize = event.target.value;
    setRoomRows(newRoomRows);
  };

  const updateRoomType = (index, event) => {
    const newRoomRows = [...roomRows];
    newRoomRows[index].roomType = event.target.value;
    setRoomRows(newRoomRows);
  };

  const handleSubmit = () => {
    const styleRequests = designValues.map((item) => item["title"]);
    const moodboardReferences = moodboardValues.map((item) => item["id"]);

    const data = {
      requestType: requestType,
      roomGeometry: roomRows,
      floorPlan: "",
      styleRequests: styleRequests,
      moodboardReferences: moodboardReferences,
      otherComments: otherComments,
    };
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
                    Please confirm your requirements (retrieved from your
                    records)
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
                        <>
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
                                        <InputAdornment>sq ft</InputAdornment>
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
                        </>
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
                  <Typography variant="h4" gutterBottom component="div">
                    Floor plan
                  </Typography>
                  <Button variant="outlined" sx={{ height: 60, width: 80 }}>
                    <Box>
                      <UploadIcon fontSize="small" sx={{ mb: -1 }} />
                      Upload
                    </Box>
                  </Button>
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
                    getOptionLabel={(option) => option.title}
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
