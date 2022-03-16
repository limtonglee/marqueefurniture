import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ChatMessage from "./ChatMessage";
import ChatAnnouncement from "./ChatAnnouncement";

const Chatbox = () => {
  const [message, setMessage] = useState("");

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

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
                src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
                sx={{ height: 60, width: 60 }}
              />
              <Box>
                <Typography variant="h4">Orange Furniture Only</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "normal" }}>
                  Designer
                </Typography>
              </Box>
            </Stack>
            <Box>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ px: 3, py: 3, backgroundColor: "grey.100" }}>
            <Stack direction="row" spacing={3}>
              <Button variant="outlined">Request for consultation</Button>
              <Button variant="outlined">Update my requirements</Button>
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
          {/* messages area */}
          <ChatMessage own={false} />
          <ChatMessage own={true} />
          <ChatMessage own={true} />
          <ChatMessage own={false} />
          <ChatMessage own={false} />
          <ChatAnnouncement hasButton={false} />
          <ChatMessage own={true} />
          <ChatMessage own={false} />
          <ChatAnnouncement hasButton={true} />
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
