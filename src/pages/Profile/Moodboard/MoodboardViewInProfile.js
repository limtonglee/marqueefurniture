import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useStores } from "../../../stores/RootStore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MoodboardPreview from "./MoodboardPreview";
import { Link } from "react-router-dom";
import SortButton from "../../../components/SortButton";
import * as socialMediaAPI from "../../../services/SocialMedia";
import MoodboardDetailsModal from "../../SocialMedia/Moodboard/MoodboardDetailsModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MoodboardViewInProfile = () => {
  const { userStore } = useStores();
  let currentSort = "popular";

  const [username, setUsername] = useState(useParams().username); // eslint-disable-line no-unused-vars

  const [moodboards, setMoodboards] = useState([]);

  // need to update this to get user.id from username
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

  const refreshData = () => {
    getCompleteMoodboardData();
  };

  const sortFeed = () => {
    if (currentSort === "ascending") {
      console.log("ascending");
      // sorting by ascending boardname
      let newMoodboards = [...moodboards];
      setMoodboards(
        newMoodboards.sort((a, b) =>
          ("" + a.boardname).localeCompare(b.boardname)
        )
      );
    }
    if (currentSort === "descending") {
      console.log("descending");
      // sorting by descending boardname
      let newMoodboards = [...moodboards];
      console.log(newMoodboards.reverse());
      setMoodboards(
        newMoodboards.sort((a, b) =>
          ("" + b.boardname).localeCompare(a.boardname)
        )
      );
    }
    if (currentSort === "recent") {
      console.log("recent");
      // sort by descending boardname for now; to be updated
      let newMoodboards = [...moodboards];
      console.log(newMoodboards.reverse());
      setMoodboards(
        newMoodboards.sort((a, b) =>
          ("" + b.boardname).localeCompare(a.boardname)
        )
      );
    }
  };

  const handleSort = (sortType) => {
    currentSort = sortType;
    sortFeed();
  };

  const [open, setOpen] = React.useState(false);

  const closeMoodboardModal = () => {
    setOpen(false);
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

  const handleCreateMoodboard = () => {
    console.log("handleCreateMoodboard");
    setOpen(true);
  };

  return (
    <>
      <MoodboardDetailsModal
        open={open}
        closeMoodboardModal={closeMoodboardModal}
        isEditing={false}
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
      <Box sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
        <SortButton handleSort={handleSort} variant="moodboard" />
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          size="large"
          onClick={handleCreateMoodboard}
        >
          New Moodboard
        </Button>
      </Box>
      {moodboards.length === 0 && (
        <Box
          sx={{
            width: "100%",
            height: 200,
            border: "1px solid #DFE3E8",
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ fontWeight: "normal", fontStyle: "italic" }}
          >
            No moodboards yet
          </Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {moodboards.map((moodboard) => (
          <Grid item xs={6} md={4} key={moodboard.id}>
            <Box>
              <Link
                to={`/moodboard/${userStore.name}/${moodboard.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "normal" }}
                  component="div"
                >
                  {moodboard.boardname}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {`${moodboard.moodboardItems.length} pin${
                    moodboard.moodboardItems.length !== 1 ? "s" : ""
                  }`}
                </Typography>
                <MoodboardPreview moodboard={moodboard} />
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MoodboardViewInProfile;
