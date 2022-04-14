import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as socialMediaAPI from "../../../services/SocialMedia";
import { useStores } from "../../../stores/RootStore";

const PostToNewMbModal = ({
  open,
  closeMoodboardModal,
  handleClickSnackbar,
  closeMDM,
  post,
  refreshPosts,
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

  const addPostToMoodboardAPI = async (postId, moodboardId) => {
    try {
      const res = await socialMediaAPI.addPostToMoodboard(postId, moodboardId);
      const data = JSON.parse(JSON.stringify(res)).data;
      // getCompleteMoodboardData(); // add function to refresh moodboard list
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const createMoodboardAPI = async (boardName, description) => {
    try {
      const res = await socialMediaAPI.createMoodboard(
        boardName,
        description,
        userStore.id
      );
      const data = JSON.parse(JSON.stringify(res)).data[0]["id"];
      console.log(data);

      await addPostToMoodboardAPI(post.id, data);

      //refreshData(); // function to refresh data?
    } catch (error) {
      console.error(error);
    }
  };

  const displayBoardnameError = () => {
    setBoardNameError(true);
    setBoardNameHelperText("Please fill in the board name");
  };

  const addPostToNewMoodboard = () => {
    if (boardName.length === 0) {
      displayBoardnameError();
    } else {
      createMoodboardAPI(boardName, boardDescription);

      setBoardName("");
      setBoardDescription("");

      prepareTextFields();
      closeMDM();
      closeMoodboardModal();
      // handleClickSnackbar("Created new moodboard");

      if (refreshPosts) {
        refreshPosts();
      }
    }
  };

  const prepareTextFields = () => {
    setBoardNameError(false);
    setBoardNameHelperText("");
  };

  useEffect(() => {
    prepareTextFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add post to new moodboard
            </Typography>

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
            <Button
              size="small"
              variant="contained"
              sx={{ width: "100%", mt: 3 }}
              onClick={addPostToNewMoodboard}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PostToNewMbModal;
