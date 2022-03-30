import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
import * as socialMediaAPI from "../../../services/SocialMedia";
import { useStores } from "../../../stores/RootStore";

const MoodboardDetailsModal = ({
  open,
  closeMoodboardModal,
  handleClosePopover,
  moodboardToEdit,
  isEditing,
  refreshData,
  handleClickSnackbar,
}) => {
  const { userStore } = useStores();

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
        userStore.id
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
    // console.log("createMoodboard");

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
  };

  const prepareToCreate = () => {
    setBoardName("");
    setBoardDescription("");
  };

  const prepareTextFields = () => {
    // console.log("prepareTextFields");
    isEditing ? prepareToUpdate() : prepareToCreate();
    setBoardNameError(false);
    setBoardNameHelperText("");
  };

  useEffect(() => {
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodboardToEdit]);

  const updateMoodboard = () => {
    if (boardName.length === 0) {
      displayBoardnameError();
    } else {
      updateMoodboardAPI(moodboardToEdit.id, boardName, boardDescription);

      prepareTextFields();
      closeMoodboardModal();
      handleClosePopover();
      handleClickSnackbar("Updated successfully");
    }
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
