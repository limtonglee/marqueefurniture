import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import user from "../../../data/currentUserData2";
import { convertToObject } from "typescript";

const MoodboardViewInProfile = () => {
  const [username, setUsername] = useState(useParams().username); // eslint-disable-line no-unused-vars

  const [moodboards, setMoodboards] = useState(user.moodboards); // need to change to get moodboards of the user when linking to BE
  console.log(moodboards);
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Button startIcon={<AddIcon />} variant="contained" size="large">
          New Moodboard
        </Button>
      </Box>
    </>
  );
};

export default MoodboardViewInProfile;
