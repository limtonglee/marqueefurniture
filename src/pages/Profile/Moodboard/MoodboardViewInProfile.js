import React, { useState } from "react";
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

const MoodboardViewInProfile = () => {
  const [username, setUsername] = useState(useParams().username); // eslint-disable-line no-unused-vars

  const [moodboards, setMoodboards] = useState(user.moodboards); // need to change to get moodboards of the user when linking to BE
  console.log(moodboards);

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="large">
            Todo: Sort
          </Button>
          <Button startIcon={<AddIcon />} variant="outlined" size="large">
            New Moodboard
          </Button>
        </Stack>
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
                  {moodboard.boardName}
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
