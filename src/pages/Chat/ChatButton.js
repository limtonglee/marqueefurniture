import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const ChatButton = () => {
  const [chatData, setChatData] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  let navigate = useNavigate();

  const handleGoToChat = () => {
    navigate("/chat");
  };

  return (
    <>
      <IconButton
        aria-label="chat"
        sx={{ color: "common.white" }}
        onClick={handleGoToChat}
      >
        {unreadCount === 0 ? (
          <ChatBubbleOutlineIcon />
        ) : (
          <Badge badgeContent={unreadCount} color="error">
            <ChatBubbleOutlineIcon />
          </Badge>
        )}
      </IconButton>
    </>
  );
};

export default ChatButton;
