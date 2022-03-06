import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Autocomplete from "@mui/material/Autocomplete";
import TagProductsModal from "./TagProductsModal";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const CreateNewPost = () => {
  const [fileUploaded, setFileUploaded] = useState("");

  const updateFile = (event) => {
    console.log(event.target.value);
    // setFileUploaded(event.target.value);
    setFileUploaded(
      "https://d1hy6t2xeg0mdl.cloudfront.net/image/483605/dd9938c2cc/standard"
    ); // mock only; for demo purpose
  };

  const [selectedProductsValues, setSelectedProductsValues] = useState([]);
  const [boardDescription, setBoardDescription] = useState("");
  const [filterRoomValues, setfilterRoomValues] = useState([]);
  const [filterDesignValues, setfilterDesignValues] = useState([]);

  const roomTags = [
    { id: 0, title: "Living Room" },
    { id: 1, title: "Kitchen" },
    { id: 2, title: "Balcony" },
    { id: 3, title: "Bedroom" },
    { id: 4, title: "Study Room" },
    { id: 5, title: "Service Yard" },
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

  const handleChangeForFilterRoom = (event, value) => {
    setfilterRoomValues(value);
  };

  const handleChangeForFilterDesign = (event, value) => {
    setfilterDesignValues(value);
  };

  const handleBoardDescription = (event) => {
    setBoardDescription(event.target.value);
  };

  let navigate = useNavigate();

  const createPost = () => {
    console.log("createPost");
    console.log(fileUploaded);
    console.log(selectedProductsValues);
    console.log(filterRoomValues);
    console.log(filterDesignValues);
    console.log(boardDescription);

    navigate("/ideas");
  };

  useEffect(() => {}, []);

  const [open, setOpen] = React.useState(false);

  const closeProductsModal = () => {
    setOpen(false);
  };

  const openProductsModal = (event) => {
    setOpen(true);
  };

  return (
    <>
      <Container sx={{ pt: 2 }}>
        <Box
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            New Post
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: 40,
            }}
            onClick={createPost}
          >
            Post
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              {fileUploaded.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 350,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0F0F0",
                    borderRadius: 3,
                  }}
                >
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={updateFile}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<PhotoCamera />}
                      size="large"
                    >
                      Upload
                    </Button>
                  </label>
                </Box>
              ) : (
                <Card
                  sx={{ width: "100%", position: "relative" }}
                  onClick={() => console.log("hi")}
                >
                  <CardMedia
                    component="img"
                    width="100%"
                    objectfit="scale-down"
                    image={fileUploaded}
                    alt="post picture"
                  />
                </Card>
              )}
            </Grid>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                      <span>Tag photo with products</span>
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
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Board description
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  placeholder="Enter description..."
                  value={boardDescription}
                  onChange={handleBoardDescription}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Room type
                </Typography>
                <Autocomplete
                  value={filterRoomValues}
                  multiple
                  limitTags={2}
                  id="room-type"
                  options={roomTags}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter by room type"
                      placeholder="Search room type"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={handleChangeForFilterRoom}
                  sx={{ width: "100%" }}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Interior design style
                </Typography>
                <Autocomplete
                  value={filterDesignValues}
                  multiple
                  limitTags={2}
                  id="design-type"
                  options={designTags}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter by interior design style"
                      placeholder="Search design style"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={handleChangeForFilterDesign}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <TagProductsModal
        open={open}
        closeProductsModal={closeProductsModal}
        selectedProductsValues={selectedProductsValues}
        setSelectedProductsValues={setSelectedProductsValues}
      />
    </>
  );
};

export default CreateNewPost;
