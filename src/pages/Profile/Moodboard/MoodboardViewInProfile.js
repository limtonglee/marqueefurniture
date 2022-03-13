import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import user from "../../../data/currentUserData2";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MoodboardPreview from "./MoodboardPreview";
import { Link } from "react-router-dom";
import SortButton from "../../../components/SortButton";
import * as socialMediaAPI from "../../../services/SocialMedia";

const MoodboardViewInProfile = () => {
  let currentSort = "popular";

  const [username, setUsername] = useState(useParams().username); // eslint-disable-line no-unused-vars

  // const [moodboards, setMoodboards] = useState(user.moodboards); // need to change to get moodboards of the user when linking to BE
  // console.log(moodboards);

  const [moodboards, setMoodboards] = useState([]);

  // need to update this to get user.id from username
  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(user.id);
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
  }, []);

  // useEffect(() => {
  //   getCompleteMoodboardData();
  // }, [moodboards]);

  const sortFeed = () => {
    if (currentSort === "ascending") {
      console.log("ascending");
      // sorting by ascending boardname
      let newMoodboards = [...moodboards];
      // setMoodboards(newMoodboards.sort((a, b) => a.boardname - b.boardname));

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

  return (
    <>
      <Box sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
        <SortButton handleSort={handleSort} variant="moodboard" />
        <Button startIcon={<AddIcon />} variant="outlined" size="large">
          New Moodboard
        </Button>
      </Box>
      <Grid container spacing={3}>
        {moodboards.map((moodboard) => (
          <Grid item xs={6} md={4} key={moodboard.id}>
            <Box>
              <Link
                to={`/moodboard/${user.username}/${moodboard.id}`}
                target="_blank"
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
                    moodboard.moodboardItems.length > 1 ? "s" : ""
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
