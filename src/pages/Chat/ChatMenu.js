import React, { useState } from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import SearchIcon from "@mui/icons-material/Search";

import List from "@mui/material/List";

import ChatMenuItem from "./ChatMenuItem";

const ChatMenu = ({ userChats, currentChatId, setCurrentChat }) => {
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
      {userChats.length > 0 ? (
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
            {userChats
              .slice(0)
              .reverse()
              .filter(
                (chat) =>
                  chat.recipientUsername.indexOf(searchTerm) !== -1 ||
                  searchTerm === ""
              )
              .map((chat) => (
                <ChatMenuItem
                  key={chat.id}
                  chat={chat}
                  isCurrent={currentChatId === chat.id}
                  setCurrentChat={setCurrentChat}
                />
              ))}
          </List>
        </Box>
      ) : (
        // <Box
        //   sx={{
        //     bgcolor: "#f2f2f2",
        //     height: "100%",
        //     border: "1px solid lightgrey",
        //     borderRadius: 1,
        //     display: "flex",
        //     flexDirection: "column",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        //   <Typography
        //     variant="h5"
        //     gutterBottom
        //     component="div"
        //     sx={{ fontWeight: "normal", fontStyle: "italic" }}
        //   >
        //     No messages yet
        //   </Typography>
        // </Box>
        <Box
          sx={{
            mt: 2,
            p: 0.5,
            height: "92%",
            display: "flex",
            overflowY: "scroll",
            border: "1px solid lightgrey",
            borderRadius: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ fontWeight: "normal", fontStyle: "italic" }}
            >
              No chats yet
            </Typography>
            {/* <Button variant="contained" size="small">
              Search for chat
            </Button> */}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default ChatMenu;
