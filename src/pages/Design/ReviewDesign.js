import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DesignItemCard from "./DesignItemCard";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";

const ReviewDesign = () => {
  let navigate = useNavigate();

  const [otherComments, setOtherComments] = useState("");

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
          <Grid item xs={12} md={11}>
            <Box sx={{ pt: 3, pb: 18 }}>
              <Typography variant="h3" gutterBottom component="div">
                Review Design
              </Typography>
              <Box sx={{ width: "100%", mt: 3 }}>
                <DesignItemCard completed={false} hideButton={true} />
              </Box>
              <Stack spacing={4} sx={{ mt: 4 }}>
                <Box>
                  <Typography variant="h5" gutterBottom component="div">
                    Add picture comments
                  </Typography>
                  <Button variant="outlined" sx={{ height: 60, width: 80 }}>
                    <Box>
                      <UploadIcon fontSize="small" sx={{ mb: -1 }} />
                      Upload
                    </Box>
                  </Button>
                </Box>
                <Box>
                  <Typography variant="h5" gutterBottom component="div">
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

export default ReviewDesign;
