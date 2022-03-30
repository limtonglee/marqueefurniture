import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import * as chatAPI from "../../services/Chat";

const ChatMenuItem = ({ chat, isCurrent, setCurrentChat }) => {
  // console.log("chat at chatmenuitem", chat);

  const [messagePreview, setMessagePreview] = useState("");

  const getLastMessagePreview = (chat) => {
    if (chat.chatMessages.length === 0) {
      return "No messages";
    } else {
      const lastMessage = chat.chatMessages[chat.chatMessages.length - 1].text;
      if (lastMessage.length < 50) {
        return lastMessage;
      } else {
        return `${lastMessage.slice(0, 50)}...`;
      }
    }
  };

  useEffect(() => {
    setMessagePreview(getLastMessagePreview(chat));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessagePreview(getLastMessagePreview(chat));
  }, [chat]);

  const isCurrentChatStyles = {
    backgroundColor: "primary.lighter",
  };

  const notCurrentChatStyles = {
    "&:hover": {
      backgroundColor: "grey.200",
      cursor: "pointer",
    },
  };

  const getChatMessages = async (chatId) => {
    try {
      const res = await chatAPI.getChatMessages(chatId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChat = async () => {
    // update the chat with latest messages first before updating state
    const updatedChatMessages = await getChatMessages(chat.id);

    const updatedChat = {
      ...chat,
      chatMessages: updatedChatMessages,
    };

    setCurrentChat(updatedChat);
    setMessagePreview(getLastMessagePreview(updatedChat));
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={isCurrent ? isCurrentChatStyles : notCurrentChatStyles}
        onClick={handleSelectChat}
      >
        <ListItemAvatar>
          <Avatar
            alt="Seller"
            // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
            // src={chat.recipientProfilePic}
            src={`/api/image/${chat.recipientProfilePic}`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h6"
                color="text.primary"
              >
                {chat.recipientUsername}
              </Typography>
            </>
          }
          secondary={messagePreview}
        />
        {/* <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            /> */}
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

export default ChatMenuItem;
