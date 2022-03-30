import React from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import ImageGallery from "react-image-gallery";

const Design = () => {
  let navigate = useNavigate();

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  const handleReviewDesign = () => {
    navigate("/designOrder/design/review");
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/* <Box
            sx={{
              pt: 5,
              pb: 3,
              width: "100%",
              // position: "fixed",
              // top: 80,
              backgroundColor: "white",
              zIndex: 99,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ backgroundColor: "white" }}
                size="small"
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>

            <Button variant="contained" size="large">
              Proceed to Review
            </Button>
          </Box> */}
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
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{ fontWeight: "normal" }}
              >
                Design 2
              </Typography>
              <Typography variant="h3" gutterBottom component="div">
                Revised
              </Typography>
              <Box sx={{ width: "100%", mt: 2 }}>
                <ImageGallery items={images} />
              </Box>
              <Box sx={{ width: "100%", mt: 3 }}>
                <Typography variant="h4" gutterBottom component="div">
                  Product List
                </Typography>
                insert listing component here~
              </Box>
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
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={handleReviewDesign}
        >
          Proceed to Review
        </Button>
      </Box>
      {/* <Button
        variant="contained"
        size="large"
        sx={{ position: "fixed", top: 130, right: 100 }}
      >
        Proceed to Review
      </Button> */}
    </>
  );
};

export default Design;
