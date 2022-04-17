import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import ImageGallery from "react-image-gallery";
import DesignProductView from "./DesignProductView";
import { useStores } from "../../stores/RootStore";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import ProductViewInDesign from "./ProductViewInDesign";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Design = () => {
  let navigate = useNavigate();
  const { userStore } = useStores();

  const location = useLocation();
  const design = location.state ? location.state.design : null;
  const designOrderStatus = location.state
    ? location.state.designOrderStatus
    : null;
  const buyerId = location.state ? location.state.buyerId : null;
  const sellerId = location.state ? location.state.sellerId : null;
  const onlyNavigateBackOne = location.state
    ? location.state.onlyNavigateBackOne
    : null;

  console.log(design);

  let images = [];
  if (design !== null) {
    // images = design.designImages.map((image) => {
    //   return {
    //     original: `/api/image/${image}`,
    //     thumbnail: `/api/image/${image}`,
    //   };
    // });

    if (design.designimages1) {
      if (design.designimages2) {
        if (design.designimages3) {
          images = [
            {
              original: `/api/image/${design.designimages1}`,
              thumbnail: `/api/image/${design.designimages1}`,
            },
            {
              original: `/api/image/${design.designimages2}`,
              thumbnail: `/api/image/${design.designimages2}`,
            },
            {
              original: `/api/image/${design.designimages3}`,
              thumbnail: `/api/image/${design.designimages3}`,
            },
          ];
        } else {
          images = [
            {
              original: `/api/image/${design.designimages1}`,
              thumbnail: `/api/image/${design.designimages1}`,
            },
            {
              original: `/api/image/${design.designimages2}`,
              thumbnail: `/api/image/${design.designimages2}`,
            },
          ];
        }
      } else {
        images = [
          {
            original: `/api/image/${design.designimages1}`,
            thumbnail: `/api/image/${design.designimages1}`,
          },
        ];
      }
    }
    // images = [
    //   {
    //     original: `/api/image/${design.designimages1}`,
    //     thumbnail: `/api/image/${design.designimages1}`,
    //   },
    //   {
    //     original: `/api/image/${design.designimages2}`,
    //     thumbnail: `/api/image/${design.designimages2}`,
    //   },
    //   {
    //     original: `/api/image/${design.designimages3}`,
    //     thumbnail: `/api/image/${design.designimages3}`,
    //   },
    // ];
    // images = [
    //   {
    //     original: "https://picsum.photos/id/1018/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1018/250/150/",
    //   },
    //   {
    //     original: "https://picsum.photos/id/1015/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1015/250/150/",
    //   },
    //   {
    //     original: "https://picsum.photos/id/1019/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1019/250/150/",
    //   },
    // ];
  }

  const handleReviewDesign = () => {
    navigate("/designOrder/design/review");
  };

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Container>
        {!userStore.isDesigner && design.isreviewed !== "1" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to="/designOrder/design/review"
              state={{
                design: design,
                designOrderStatus: designOrderStatus,
                buyerId: buyerId,
                sellerId: sellerId,
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{ position: "fixed", zIndex: 99 }}
              >
                Proceed to Review
              </Button>
            </Link>
          </Box>
        )}
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
              onClick={() =>
                onlyNavigateBackOne ? navigate(-1) : navigate(-2)
              }
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
                Design
              </Typography>
              <Typography variant="h3" gutterBottom component="div">
                Revised
              </Typography>
              <Box sx={{ width: "auto", bgcolor: "background" }}>
                {/* {userStore.isDesigner ? (
                  <Tabs
                    value={tabValue}
                    onChange={handleSetTabValue}
                    centered
                    variant="fullWidth"
                    sx={{ background: "white" }}
                  >
                    <Tab label="Images" />
                    <Tab label="Products" />
                    <Tab label="Review" />
                  </Tabs>
                ) : (
                  <Tabs
                    value={tabValue}
                    onChange={handleSetTabValue}
                    centered
                    variant="fullWidth"
                    sx={{ background: "white" }}
                  >
                    <Tab label="Images" />
                    <Tab label="Products" />
                  </Tabs>
                )} */}
                <Tabs
                  value={tabValue}
                  onChange={handleSetTabValue}
                  centered
                  variant="fullWidth"
                  sx={{ background: "white" }}
                >
                  <Tab label="Images" />
                  <Tab label="Products" />
                  <Tab label="Review" />
                </Tabs>

                {/* <Tabs
                  value={tabValue}
                  onChange={handleSetTabValue}
                  centered
                  variant="fullWidth"
                  sx={{ background: "white" }}
                >
                  <Tab label="Images" />
                  <Tab label="Products" />
                  <Tab label="Review" />
                </Tabs> */}
                <Divider />
              </Box>
              {tabValue === 0 && (
                <>
                  {images.length > 0 ? (
                    <Box sx={{ width: "100%", mt: 3 }}>
                      <ImageGallery items={images} />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        border: "1px solid #DFE3E8",
                        borderRadius: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        sx={{ fontWeight: "normal", fontStyle: "italic" }}
                      >
                        No images
                      </Typography>
                    </Box>
                  )}
                </>
              )}
              {tabValue === 1 && (
                <>
                  <Box sx={{ width: "100%", mt: 5 }}>
                    {/* <Typography variant="h4" gutterBottom component="div">
                      Product List
                    </Typography>
                    will be inserted when BE data is in */}
                    <ProductViewInDesign
                      taggedProducts={design.taggedProducts}
                    />
                  </Box>
                </>
              )}
              {tabValue === 2 && (
                <>
                  {design.isCompleted === "0" ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        border: "1px solid #DFE3E8",
                        borderRadius: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        sx={{ fontWeight: "normal", fontStyle: "italic" }}
                      >
                        No review yet
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h4" component="div">
                          Picture comments
                        </Typography>
                        {design.userpicturecomment1 === "" ? (
                          <>No files</>
                        ) : (
                          <>
                            <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
                              {design.userpicturecomment1 && (
                                <Card
                                  sx={{
                                    width: 300,
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    objectfit="scale-down"
                                    image={`/api/image/${design.userpicturecomment1}`}
                                    alt="post picture"
                                  />
                                </Card>
                              )}
                              {design.userpicturecomment2 && (
                                <Card
                                  sx={{
                                    width: 300,
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    objectfit="scale-down"
                                    image={`/api/image/${design.userpicturecomment2}`}
                                    alt="post picture"
                                  />
                                </Card>
                              )}
                              {design.userpicturecomment3 && (
                                <Card
                                  sx={{
                                    width: 300,
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <CardMedia
                                    component="img"
                                    width="100%"
                                    objectfit="scale-down"
                                    image={`/api/image/${design.userpicturecomment3}`}
                                    alt="post picture"
                                  />
                                </Card>
                              )}
                              {/* {design.customerReview.pictureComments.map(
                                (file, i) => (
                                  <Card
                                    key={i}
                                    sx={{
                                      width: 400,
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
                                )
                              )} */}
                            </Stack>
                          </>
                        )}
                      </Box>
                      <Box sx={{ mt: 5 }}>
                        <Typography variant="h4" gutterBottom component="div">
                          Other Comments
                        </Typography>
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={4}
                          sx={{ width: 600 }}
                          value={design.userothercomment}
                          disabled
                        />
                      </Box>
                      <Box sx={{ mt: 5 }}>
                        <Typography variant="h4" gutterBottom component="div">
                          {/* Do you approve this design? */}
                          {userStore.isDesigner
                            ? "Does customer approve this design?"
                            : "Do you approve this design?"}
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={design.iscompleted}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Yes"
                              disabled
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              label="No"
                              disabled
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </>
                  )}
                </>
              )}
              {/* {images.length > 0 && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <ImageGallery items={images} />
                </Box>
              )} */}
              {/* <Box sx={{ width: "100%", mt: 3 }}>
                <Typography variant="h4" gutterBottom component="div">
                  Product List
                </Typography>
                insert listing component here~
              </Box> */}
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
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={handleReviewDesign}
        >
          Proceed to Review
        </Button>
      </Box> */}
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
