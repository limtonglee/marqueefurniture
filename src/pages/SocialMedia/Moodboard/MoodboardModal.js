import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as socialMediaAPI from "../../../services/SocialMedia";
import { useStores } from "../../../stores/RootStore";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MoodboardModal = ({
  open,
  closeMoodboardModal,
  post,
  postPinned,
  refreshPosts,
  sourceMoodboardId,
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
      width: 350,
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

  const [moodboards, setMoodboards] = useState([]);

  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(userStore.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getMoodboardPosts = async (moodboardId) => {
    try {
      const res = await socialMediaAPI.getMoodboardPosts(moodboardId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompleteMoodboardData = async () => {
    const allUserMoodboards = await getUserMoodboards();

    var promises = allUserMoodboards.map(async (moodboard) => {
      const moodboardPosts = await getMoodboardPosts(moodboard.id);
      const completeMoodboard = {
        ...moodboard,
        moodboardItems: moodboardPosts,
      };

      // console.log("completeMoodboard", completeMoodboard); // works
      return completeMoodboard;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      setMoodboards(values);
      return values;
    });
  };

  useEffect(() => {
    getCompleteMoodboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCompleteMoodboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodboards]);

  const [checked, setChecked] = useState([]);
  const [prevChecked, setPrevChecked] = useState([]);

  useEffect(() => {
    if (postPinned && checked.length === 0) {
      moodboards.forEach((moodboard) => {
        for (let moodboardItem of moodboard.moodboardItems) {
          if (moodboardItem.id === post.id) {
            checked.push(moodboard.id);
          }
        }
      });
      setPrevChecked(checked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodboards]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addPostToMoodboardAPI = async (postId, moodboardId) => {
    try {
      const res = await socialMediaAPI.addPostToMoodboard(postId, moodboardId);
      const data = JSON.parse(JSON.stringify(res)).data;
      getCompleteMoodboardData(); // add function to refresh moodboard list
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostFromMoodboardAPI = async (postId, moodboardId) => {
    try {
      const res = await socialMediaAPI.deletePostFromMoodboard(
        postId,
        moodboardId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      getCompleteMoodboardData(); // add function to refresh moodboard list
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addPostToMoodboard = () => {
    for (let moodboardId of checked) {
      console.log(`adding post.id ${post.id} to moodboardId ${moodboardId}`);
      addPostToMoodboardAPI(post.id, moodboardId);
    }
    closeMoodboardModal();
    setPrevChecked(checked);
    handleClickSnackbar();
  };

  const addPostToNewMoodboard = () => {
    console.log("addPostToNewMoodboard");
    console.log("not done");
  };

  const updatePostPinnedLocations = () => {
    const toRemovePostFrom = prevChecked.filter((x) => !checked.includes(x));
    const toAddPostTo = checked.filter((x) => !prevChecked.includes(x));

    for (let moodboardId of toRemovePostFrom) {
      console.log(
        `removing post.id ${post.id} from moodboardId ${moodboardId}`
      );
      deletePostFromMoodboardAPI(post.id, moodboardId);
    }

    for (let moodboardId of toAddPostTo) {
      console.log(`adding post.id ${post.id} to moodboardId ${moodboardId}`);
      addPostToMoodboardAPI(post.id, moodboardId);
    }

    closeMoodboardModal();
    setPrevChecked(checked);
    handleClickSnackbar();

    if (refreshPosts) {
      refreshPosts();
    }
  };

  const deletePostFromThisMoodboard = () => {
    console.log("deletePostFromThisMoodboard");
    console.log("sourceMoodboardId", sourceMoodboardId);

    console.log(
      `removing post.id ${post.id} from moodboardId ${sourceMoodboardId}`
    );
    deletePostFromMoodboardAPI(post.id, sourceMoodboardId);

    // update moodboard state
    getCompleteMoodboardData();

    closeMoodboardModal();
    handleCloseDialog();
    handleClickSnackbar();

    if (refreshPosts) {
      refreshPosts();
    }
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const noChangeMade = () => {
    return (
      prevChecked.filter((x) => !checked.includes(x)).length === 0 &&
      checked.filter((x) => !prevChecked.includes(x)).length === 0
    );
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Updated successfully
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete from this moodboard?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this post from this moodboard?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={deletePostFromThisMoodboard} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {!postPinned && (
        <Modal
          open={open}
          onClose={() => {
            closeMoodboardModal();
            setChecked(prevChecked);
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
                Add post to moodboard
              </Typography>
              <IconButton aria-label="delete" onClick={closeMoodboardModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={modalStyles.contents}>
              <Box sx={{ maxHeight: 250, overflow: "scroll" }}>
                <List dense sx={{ height: "20 !important" }}>
                  {moodboards.map((moodboard, index) => {
                    const moodboardName = moodboard.boardname;
                    const moodboardId = moodboard.id;
                    const labelId = `checkbox-list-secondary-label-${moodboardName}`;
                    return (
                      <ListItem
                        key={moodboardId}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(moodboardId)}
                            checked={checked.indexOf(moodboardId) !== -1}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton sx={{ pl: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              alt={`${moodboardName} Moodboard`}
                              src={
                                moodboard.moodboardItems.length > 0
                                  ? moodboard.moodboardItems[0].image
                                  : null
                              }
                              sx={{
                                borderRadius: "10%",
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            id={moodboardId}
                            primary={moodboardName}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Box>
              <Button size="small" onClick={addPostToNewMoodboard}>
                Add to new moodboard
              </Button>
            </Box>
            <Box sx={modalStyles.contents}>
              {checked.length === 0 ? (
                <Button
                  size="small"
                  variant="contained"
                  onClick={addPostToMoodboard}
                  disabled
                >
                  Add
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={addPostToMoodboard}
                >
                  Add
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      )}
      {postPinned && (
        <Modal
          open={open}
          onClose={() => {
            closeMoodboardModal();
            setChecked(prevChecked);
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
                Pinned to moodboard
              </Typography>
              <IconButton aria-label="delete" onClick={closeMoodboardModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={modalStyles.contents}>
              <Box sx={{ maxHeight: 250, overflow: "scroll" }}>
                <List dense>
                  {moodboards.map((moodboard, index) => {
                    const moodboardName = moodboard.boardname;
                    const moodboardId = moodboard.id;
                    const labelId = `checkbox-list-secondary-label-${moodboardName}`;
                    return (
                      <ListItem
                        key={moodboardId}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(moodboardId)}
                            checked={checked.indexOf(moodboardId) !== -1}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton sx={{ pl: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              alt={`${moodboardName} Moodboard`}
                              src={
                                moodboard.moodboardItems.length > 0
                                  ? moodboard.moodboardItems[0].image
                                  : null
                              }
                              sx={{
                                borderRadius: "10%",
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            id={moodboardId}
                            primary={moodboardName}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            <Box>
              <Button size="small" onClick={addPostToNewMoodboard}>
                Add to new moodboard
              </Button>
              {sourceMoodboardId && (
                <Button
                  size="small"
                  color="error"
                  onClick={handleClickOpenDialog}
                >
                  Delete from this moodboard
                </Button>
              )}
            </Box>
            <Box sx={modalStyles.contents}>
              {noChangeMade() ? (
                <Button
                  size="small"
                  variant="contained"
                  onClick={updatePostPinnedLocations}
                  disabled
                >
                  Update
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  onClick={updatePostPinnedLocations}
                >
                  Update
                </Button>
              )}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default MoodboardModal;
