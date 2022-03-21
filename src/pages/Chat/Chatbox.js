import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import ReportIcon from "@mui/icons-material/Report";

import ChatMessage from "./ChatMessage";
import ChatAnnouncement from "./ChatAnnouncement";

import * as chatAPI from "../../services/Chat";
import * as socialMediaAPI from "../../services/SocialMedia";

import { useStores } from "../../stores/RootStore";

const Chatbox = ({ currentChat }) => {
  console.log("currentChat", currentChat);
  const { userStore } = useStores();

  const [message, setMessage] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const [openMoreMenu, setOpenMoreMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const popoverId = openMoreMenu ? "simple-popover" : undefined;

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f2f2f2",
          height: "100%",
          border: "1px solid lightgrey",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              p: 3,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="User"
                // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
                src={currentChat.recipientProfilePic}
                sx={{ height: 60, width: 60 }}
              />
              <Box>
                <Typography variant="h4">
                  {currentChat.recipientUsername}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "normal" }}>
                  Designer
                </Typography>
              </Box>
            </Stack>
            <Box>
              <IconButton onClick={handleClickPopover}>
                <MoreHorizIcon />
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
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    startIcon={<ReportIcon />}
                    color="error"
                  >
                    Report Seller
                  </Button>
                </Box>
              </Popover>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
              >
                Request for consultation
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "grey.200",
                  },
                }}
              >
                Update my requirements
              </Button>
            </Stack>
          </Box>
          <Divider />
        </Box>
        <Box
          sx={{
            height: "100%",
            backgroundColor: "white",
            overflowY: "scroll",
          }}
        >
          {currentChat.chatMessages.length === 0 ? (
            <>
              <Box
                sx={{
                  height: "100%",
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
                  No messages yet
                </Typography>
              </Box>
            </>
          ) : (
            currentChat.chatMessages.map((message) => {
              if (message.type === "Message") {
                return (
                  <ChatMessage
                    message={message}
                    recipientProfilePic={currentChat.recipientProfilePic}
                    own={message.userid === userStore.id}
                  />
                );
              } else if (message.type === "Announcement") {
                return <ChatAnnouncement message={message} hasButton={false} />;
              } else {
                return <ChatAnnouncement message={message} hasButton={true} />;
              }
            })
          )}
        </Box>
        <Divider />
        <Box sx={{ p: 3, backgroundColor: "white" }}>
          <form autocomplete="off">
            <Stack direction="row" spacing={2}>
              <Box>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </Box>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="Type something..."
                sx={{ width: "100%", mr: 1 }}
                onChange={updateMessage}
                value={message}
                autoComplete="off"
              />
              <Box>
                <IconButton>
                  <SendIcon />
                </IconButton>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Chatbox;