import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { useStores } from "../../stores/RootStore";
import * as socialMediaAPI from "../../services/SocialMedia";
import * as designEngagementAPI from "../../services/DesignEngagement";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const DesignRequirements = () => {
  const { userStore } = useStores();

  const [moodboardValues, setMoodboardValues] = useState([]);
  const [designValues, setDesignValues] = useState([]);
  const [otherComments, setOtherComments] = useState("");
  const [requestType, setRequestType] = useState("");
  const [files, setFiles] = useState([]);

  //! dummy ------------------------
  const dummy = {
    requestType: "designonly",
    roomGeometry: [
      { id: 1, roomSize: "142", roomType: "Kitchen" },
      { id: 2, roomSize: "111", roomType: "Bedroom" },
    ],
    floorPlan: [
      "d5905def5a6366ae4a3b3cadced8cbd2",
      "dd1f03dcab86c065cc069e07a1931d98",
      "c7befb8cdc6dc9623673a57ee78e6447",
    ],
    styleRequests: [5, 10],
    moodboardReferences: [3, 1],
    otherComments: "comment goes here",
  };
  useEffect(() => {
    setFiles(dummy.floorPlan);
    setRoomRows(dummy.roomGeometry);
    setRequestType(dummy.requestType);
    setOtherComments(dummy.otherComments);
  }, []);

  // ! ------------------------------

  const getPostTags = async () => {
    try {
      const res = await socialMediaAPI.getAllTags();
      const data = JSON.parse(JSON.stringify(res)).data;

      const designTags = data
        .filter((item) => item.tagtype === "Design")
        .filter((item) => dummy.styleRequests.includes(item.id));
      setDesignValues(designTags);

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
      const cleaned = data
        .map((item) => {
          return { id: item.id, boardname: item.boardname };
        })
        .filter((item) => dummy.moodboardReferences.includes(item.id));
      // console.log("cleaned", cleaned);
      setMoodboardValues(cleaned);
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

  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Stack spacing={3}>
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
                  disabled
                />
                <FormControlLabel
                  value="fulldesignandcoordination"
                  control={<Radio />}
                  label="Full Design and Coordination"
                  disabled
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
                      <Typography variant="h6" gutterBottom component="div">
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
                              onChange={(event) => updateRoomSize(i, event)}
                              disabled
                            />
                          </Box>
                          <Box>
                            <TextField
                              required
                              id="outlined-required"
                              placeholder="Enter room type"
                              value={room.roomType}
                              onChange={(event) => updateRoomType(i, event)}
                              disabled
                            />
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </FormControl>
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

            {files.length === 0 ? (
              <>No files</>
            ) : (
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
              </>
            )}
          </Box>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Style Requests
            </Typography>
            <Stack direction="row" spacing={1}>
              {designValues.map((design) => (
                <Chip
                  label={design.tagname}
                  variant="outlined"
                  key={design.id}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="h4" gutterBottom component="div">
              Moodboard References
            </Typography>
            <Stack direction="row" spacing={1}>
              {moodboardValues.map((moodboard) => (
                <Chip
                  label={moodboard.boardname}
                  variant="outlined"
                  key={moodboard.id}
                />
              ))}
            </Stack>
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
              sx={{ width: 600 }}
              value={otherComments}
              onChange={handleChangeOtherComments}
              disabled
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default DesignRequirements;
