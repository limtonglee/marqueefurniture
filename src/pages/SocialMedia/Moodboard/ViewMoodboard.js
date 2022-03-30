import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MoodboardDetailsModal from "./MoodboardDetailsModal";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ProductView from "./ProductView";
import { useNavigate, useParams, useNavigationType } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import * as socialMediaAPI from "../../../services/SocialMedia";
import FeedGrid from "../FeedGrid/FeedGrid";
import SettingsIcon from "@mui/icons-material/Settings";
import Popover from "@mui/material/Popover";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useStores } from "../../../stores/RootStore";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ViewMoodboard = () => {
  const { userStore } = useStores();
  const username = useParams().username; // eslint-disable-line no-unused-vars
  const moodboardId = parseInt(useParams().moodboardId);
  const [currentMoodboard, setCurrentMoodboard] = useState([]);

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

  const getPostLikes = async (post) => {
    try {
      const res = await socialMediaAPI.getPostLikes(post.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      data = data.map((item) => item.username); // clean likes data
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostProducts = async (post) => {
    try {
      const res = await socialMediaAPI.getPostListings(post.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostTags = async (post) => {
    try {
      const res = await socialMediaAPI.getPostTags(post.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      data = data.map((item) => item.tagname); // clean tags data
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostComments = async (post) => {
    try {
      const res = await socialMediaAPI.getPostComments(post.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompleteMoodboardData = async () => {
    const allUserMoodboards = await getUserMoodboards();

    const currentMoodboardDetails = allUserMoodboards.filter(
      (moodboard) => moodboard.id === moodboardId
    )[0];

    const currentMoodboardPosts = await getMoodboardPosts(moodboardId);

    var promises = currentMoodboardPosts.map(async (post) => {
      const postLikes = await getPostLikes(post);
      const postProducts = await getPostProducts(post);
      const postTags = await getPostTags(post);
      const postComments = await getPostComments(post);
      const completePost = {
        ...post,
        comments: postComments,
        likes: postLikes,
        products: postProducts,
        tags: postTags,
      };

      // console.log("completePost", completePost); // works
      return completePost;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      // console.log("cleaned post data", values); // works
      // setPosts(values); // doesnt work

      const completeCurrentMoodboard = {
        ...currentMoodboardDetails,
        moodboardItems: values,
      };

      console.log("completeCurrentMoodboard", completeCurrentMoodboard);

      setCurrentMoodboard(completeCurrentMoodboard);
    });
  };

  useEffect(() => {
    getCompleteMoodboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (navigationType === "POP") {
      setIsPostView(userStore.prevViewOnMoodboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = () => {
    getCompleteMoodboardData();
  };

  const handleEditMoodboard = () => {
    // console.log("handleEditMoodboard");
    setOpen(true);
  };

  let navigate = useNavigate();

  const handleDeleteMoodboard = async () => {
    try {
      const res = await socialMediaAPI.deleteMoodboard(currentMoodboard.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);

      handleCloseDialog();
      handleClickSnackbar("Deleted successfully");

      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const [open, setOpen] = React.useState(false);

  const closeMoodboardModal = () => {
    setOpen(false);
    handleClosePopover();
  };

  const navigationType = useNavigationType();

  const [isPostView, setIsPostView] = React.useState(true);

  const toggleView = () => {
    setIsPostView(!isPostView);
    userStore.setPrevViewOnMoodboard(!isPostView);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <MoodboardDetailsModal
        open={open}
        closeMoodboardModal={closeMoodboardModal}
        handleClosePopover={handleClosePopover}
        moodboardToEdit={currentMoodboard}
        isEditing={true}
        handleClickSnackbar={handleClickSnackbar}
        refreshData={refreshData}
      />
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this moodboard?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this moodboard? Your actions cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDeleteMoodboard} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Container sx={{ pt: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ backgroundColor: "common.white", mb: 3 }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "normal" }}
              component="div"
              gutterBottom
            >
              {currentMoodboard.boardname}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "normal",
                color: "grey.500",
                textTransform: "uppercase",
              }}
              component="div"
            >
              Description
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal" }}
              component="div"
            >
              {currentMoodboard.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClickPopover}>
                <SettingsIcon />
              </IconButton>
              <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      sx={{ width: "100%" }}
                      startIcon={<EditIcon />}
                      onClick={handleEditMoodboard}
                      color="warning"
                    >
                      Edit Board
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: "100%" }}
                      startIcon={<DeleteOutlineIcon />}
                      onClick={handleClickOpenDialog}
                      color="error"
                    >
                      Delete Board
                    </Button>
                  </Stack>
                </Box>
              </Popover>
              <IconButton
                onClick={() => {
                  handleClickSnackbar("Copied to clipboard");
                  navigator.clipboard.writeText(window.location.toString());
                }}
              >
                <ShareIcon />
              </IconButton>
              {isPostView ? (
                <IconButton onClick={() => toggleView()}>
                  <DashboardIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => toggleView()}>
                  <ShoppingBagIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ pt: 4 }}>
        {currentMoodboard.moodboardItems ? (
          <>
            {currentMoodboard.moodboardItems.length === 0 ? (
              <h1>no posts</h1>
            ) : (
              <>
                {isPostView && (
                  <FeedGrid
                    posts={currentMoodboard.moodboardItems}
                    refreshPosts={refreshData}
                    sourceMoodboardId={currentMoodboard.id}
                  />
                )}
                {!isPostView && <ProductView moodboard={currentMoodboard} />}
              </>
            )}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  );
};

export default ViewMoodboard;
