import React, { useState } from "react";
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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import Autocomplete from "@mui/material/Autocomplete";

import Grid from "@mui/material/Grid";

import { shadows } from "@mui/system";

const RequestConsultation = () => {
  let navigate = useNavigate();

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [moodboardValues, setMoodboardValues] = useState([]);
  const [designValues, setDesignValues] = useState([]);
  const [otherComments, setOtherComments] = useState("");

  const moodboardTags = [
    { id: 0, title: "Moodboard 1" },
    { id: 1, title: "Moodboard 2" },
    { id: 2, title: "Moodboard 3" },
    { id: 3, title: "Moodboard 4" },
    { id: 4, title: "Moodboard 5" },
    { id: 5, title: "Moodboard 6" },
  ];

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

  const handleChangeForMoodboardTags = (event, value) => {
    setMoodboardValues(value);
  };

  const handleChangeForDesignTags = (event, value) => {
    setDesignValues(value);
  };

  const handleChangeOtherComments = (event) => {
    setOtherComments(event.target.value);
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
                      defaultValue="female"
                      name="radio-buttons-group"
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
                  <Stack direction="row" spacing={3}>
                    <Typography variant="h6" gutterBottom component="div">
                      Room 1
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <Box>
                          <Typography
                            variant="body1"
                            gutterBottom
                            component="div"
                          >
                            Room Size
                          </Typography>
                          <TextField
                            id="outlined-textarea"
                            placeholder="Enter area"
                            type="number"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>sq ft</InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            gutterBottom
                            component="div"
                          >
                            Room Type
                          </Typography>
                          <TextField
                            required
                            id="outlined-required"
                            placeholder="Enter room type"
                          />
                        </Box>
                      </Stack>
                      <Box>
                        <Button startIcon={<AddIcon />} variant="outlined">
                          Add another room
                        </Button>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="h4" gutterBottom component="div">
                    Floor plan
                  </Typography>
                  <Button variant="contained" sx={{ height: 60, width: 80 }}>
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
                    getOptionLabel={(option) => option.title}
                    defaultValue={[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Moodboard references"
                        placeholder="Search moodboard name"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
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
                  <Button variant="contained" size="large" sx={{ width: 200 }}>
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
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
      </Box>
    </>
  );
};

export default RequestConsultation;