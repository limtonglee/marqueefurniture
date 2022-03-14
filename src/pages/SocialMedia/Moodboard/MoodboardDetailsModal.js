import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
import { useNavigate } from "react-router-dom";
import * as socialMediaAPI from "../../../services/SocialMedia";

const MoodboardDetailsModal = ({
  open,
  closeMoodboardModal,
  handleClosePopover,
  moodboardToEdit,
  isEditing,
  // setIsEditing,
  refreshData,
  handleClickSnackbar,
}) => {
  const modalStyles = {
    wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      minWidth: 350,
      borderRadius: 2,
    },
    contents: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      justifyContent: "flex-start",
    },
    buttons: {
      display: "flex",
      justifyContent: "end",
    },
  };

  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [boardNameError, setBoardNameError] = useState(false);
  const [boardNameHelperText, setBoardNameHelperText] = useState("");
  // const [filterRoomValues, setfilterRoomValues] = useState([]);
  // const [filterDesignValues, setfilterDesignValues] = useState([]);

  let navigate = useNavigate();

  // const roomTags = [
  //   { id: 0, title: "Living Room" },
  //   { id: 1, title: "Kitchen" },
  //   { id: 2, title: "Balcony" },
  //   { id: 3, title: "Bedroom" },
  //   { id: 4, title: "Study Room" },
  //   { id: 5, title: "Service Yard" },
  // ];

  // const designTags = [
  //   { id: 0, title: "Art Deco" },
  //   { id: 1, title: "Asian Zen" },
  //   { id: 2, title: "Bohemian" },
  //   { id: 3, title: "Coastal" },
  //   { id: 4, title: "Contemporary" },
  //   { id: 5, title: "Eclectic" },
  //   { id: 6, title: "French Country" },
  //   { id: 7, title: "Industrial" },
  //   { id: 8, title: "Meditarranean" },
  //   { id: 9, title: "Minimalist" },
  //   { id: 10, title: "Modern" },
  //   { id: 11, title: "Modern Farmhouse" },
  //   { id: 12, title: "Rustic" },
  //   { id: 13, title: "Scandinavian" },
  //   { id: 14, title: "Shabby Chic" },
  //   { id: 15, title: "Traditional" },
  //   { id: 16, title: "Transitional" },
  // ];

  // const handleChangeForFilterRoom = (event, value) => {
  //   setfilterRoomValues(value);
  // };

  // const handleChangeForFilterDesign = (event, value) => {
  //   setfilterDesignValues(value);
  // };

  const handleBoardDescription = (event) => {
    setBoardDescription(event.target.value);
  };

  const handleBoardName = (event) => {
    setBoardName(event.target.value);
  };

  const createMoodboardAPI = async (boardName, description) => {
    try {
      const res = await socialMediaAPI.createMoodboard(
        boardName,
        description,
        user.id
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  const updateMoodboardAPI = async (moodBoardId, boardName, description) => {
    try {
      const res = await socialMediaAPI.editMoodboard(
        moodBoardId,
        boardName,
        description
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  const displayBoardnameError = () => {
    setBoardNameError(true);
    setBoardNameHelperText("Please fill in the board name");
  };

  const createMoodboard = () => {
    console.log("createMoodboard");
    // console.log(filterRoomValues);
    // console.log(filterDesignValues);
    // console.log(boardDescription);
    // console.log(boardName);

    if (boardName.length === 0) {
      displayBoardnameError();
    } else {
      createMoodboardAPI(boardName, boardDescription);

      setBoardName("");
      setBoardDescription("");

      // navigate(`/moodboard/${user.username}/${newId}`);
      prepareTextFields();
      closeMoodboardModal();
      handleClickSnackbar("Created new moodboard");
    }
  };

  const prepareToUpdate = () => {
    // console.log("preparetoupdate");
    // console.log("moodboardToEdit", moodboardToEdit);
    setBoardName(moodboardToEdit.boardname);
    setBoardDescription(moodboardToEdit.description);

    // const newFilterRoomValues = [];
    // for (let tag of roomTags) {
    //   if (moodboardToEdit.tags[0].includes(tag.title)) {
    //     newFilterRoomValues.push(tag);
    //   }
    // }
    // setfilterRoomValues(newFilterRoomValues);

    // const newFilterDesignValues = [];
    // for (let tag of designTags) {
    //   if (moodboardToEdit.tags[1].includes(tag.title)) {
    //     newFilterDesignValues.push(tag);
    //   }
    // }
    // setfilterDesignValues(newFilterDesignValues);
  };

  const prepareToCreate = () => {
    setBoardName("");
    setBoardDescription("");
    // setfilterRoomValues([]);
    // setfilterDesignValues([]);
  };

  const prepareTextFields = () => {
    // console.log("prepareTextFields");
    isEditing ? prepareToUpdate() : prepareToCreate();
    setBoardNameError(false);
    setBoardNameHelperText("");
  };

  useEffect(() => {
    // isEditing ? prepareToUpdate() : prepareToCreate();
    // setBoardNameError(false);
    // setBoardNameHelperText("");
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    prepareTextFields();
  }, [moodboardToEdit]);

  const updateMoodboard = () => {
    // moodboardToEdit
    // console.log("update moodboard");

    // const newMoodboard = {
    //   ...moodboardToEdit,
    //   boardName: { boardName },
    //   boardDescription: { boardDescription },
    //   tags: [filterRoomValues, filterDesignValues],
    // };

    // //TODO: update new moodboard
    // for (let moodboard in user.moodboards) {
    //   if (moodboard.id === moodboardToEdit.id) {
    //     moodboard = newMoodboard;
    //   }
    // }

    // console.log("updated moodboard", newMoodboard);
    // setIsEditing(false);

    if (boardName.length === 0) {
      displayBoardnameError();
    } else {
      updateMoodboardAPI(moodboardToEdit.id, boardName, boardDescription);

      prepareTextFields();
      closeMoodboardModal();
      handleClosePopover();
      handleClickSnackbar("Updated successfully");
    }

    // updateMoodboardAPI(moodboardToEdit.id, boardName, boardDescription);

    // prepareTextFields();
    // closeMoodboardModal();
    // handleClickSnackbar("Updated successfully");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          prepareTextFields();
          closeMoodboardModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles.wrapper}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isEditing ? (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit moodboard
              </Typography>
            ) : (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create new moodboard
              </Typography>
            )}

            <IconButton aria-label="delete" onClick={closeMoodboardModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom component="div">
                Board name
              </Typography>
              <TextField
                id="outlined--static"
                placeholder="Enter board name..."
                value={boardName}
                onChange={handleBoardName}
                sx={{ width: "100%" }}
                size="small"
                required
                error={boardNameError}
                helperText={boardNameHelperText}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom component="div">
                Board description
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                placeholder="Enter description..."
                value={boardDescription}
                onChange={handleBoardDescription}
                sx={{ width: "100%" }}
                size="small"
              />
            </Box>

            {/* <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Board name
                  </Typography>
                  <TextField
                    id="outlined--static"
                    placeholder="Enter board name..."
                    value={boardName}
                    onChange={handleBoardName}
                    sx={{ width: "100%" }}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Board description
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={3}
                    placeholder="Enter description..."
                    value={boardDescription}
                    onChange={handleBoardDescription}
                    sx={{ width: "100%" }}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
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
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
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
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid> */}
          </Stack>
          <Box>
            {isEditing ? (
              <Button
                size="small"
                variant="contained"
                sx={{ width: "100%", mt: 3 }}
                onClick={updateMoodboard}
              >
                Update
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                sx={{ width: "100%", mt: 3 }}
                onClick={createMoodboard}
              >
                Create
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MoodboardDetailsModal;
