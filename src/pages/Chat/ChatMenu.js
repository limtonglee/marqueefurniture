import React, { useState } from "react";
import Box from "@mui/material/Box";

import { TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

import List from "@mui/material/List";

import ChatMenuItem from "./ChatMenuItem";

const ChatMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <TextField
        fullWidth
        id="standard-bare"
        variant="outlined"
        placeholder="Search conversation"
        defaultValue={searchTerm}
        onChange={handleSearchTerm}
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <Box
        sx={{
          mt: 2,
          p: 0.5,
          height: "92%",
          // display: "flex",
          alignItems: "stretch",
          overflowY: "scroll",
          border: "1px solid lightgrey",
          borderRadius: 1,
        }}
      >
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ChatMenuItem />
          <ChatMenuItem />
          <ChatMenuItem />
        </List>
      </Box>
    </>
  );
};

export default ChatMenu;
