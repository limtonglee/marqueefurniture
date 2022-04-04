import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

import * as chatAPI from "../../services/Chat";
import { useStores } from "../../stores/RootStore";

const ChatMenuItem = ({ chat, isCurrent, setCurrentChat, refreshData }) => {
  // console.log("chat at chatmenuitem", chat);
  const { userStore } = useStores();

  const [messagePreview, setMessagePreview] = useState("");
  const [invisible, setInvisible] = useState(true);

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

  // useEffect(() => {
  //   setMessagePreview(getLastMessagePreview(chat));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    setMessagePreview(getLastMessagePreview(chat));
    // setInvisible(chat.isunread !== "1");

    if (isCurrent) {
      setInvisible(true);
      markChatAsRead(chat.id);
    } else {
      setInvisible(isInvisible(chat));
    }
  }, [chat]);

  const isInvisible = (chat) => {
    if (chat.chatMessages.length > 0) {
      if (
        chat.chatMessages[chat.chatMessages.length - 1].userid !==
          userStore.id &&
        chat.isunread === "1"
      ) {
        return false; // needs noti of new message from other party
      }
      return true;
    }
    return true;
  };

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

  const markChatAsRead = async (chatId) => {
    try {
      const res = await chatAPI.markChatAsRead(chatId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("markChatAsRead", data);
      // refreshData();
      setInvisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChat = async () => {
    if (chat.isunread) {
      await markChatAsRead(chat.id);
    }

    // update the chat with latest messages first before updating state
    const updatedChatMessages = await getChatMessages(chat.id);

    const updatedChat = {
      ...chat,
      chatMessages: updatedChatMessages,
    };

    setCurrentChat(updatedChat);
    setMessagePreview(getLastMessagePreview(updatedChat));
    // setInvisible(isInvisible(updatedChat));
  };

  // chat.chatMessages.length > 0 &&
  //   console.log(
  //     "bij",
  //     chat.chatMessages[chat.chatMessages.length - 1].userid !== userStore.id
  //   );

  return (
    <>
      {/* {chat.isunread === "0" ? (
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
          </ListItem>
          <Divider variant="middle" component="li" />
        </>
      ) : (
        <>
          <ListItem
            alignItems="flex-start"
            sx={isCurrent ? isCurrentChatStyles : notCurrentChatStyles}
            onClick={handleSelectChat}
          >
            <ListItemAvatar>
              <Badge
                color="warning"
                variant="dot"
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                invisible={invisible}
              >
                <Avatar
                  alt="Seller"
                  // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
                  // src={chat.recipientProfilePic}
                  src={`/api/image/${chat.recipientProfilePic}`}
                />
              </Badge>
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
          </ListItem>
          <Divider variant="middle" component="li" />
        </>
      )} */}

      <ListItem
        alignItems="flex-start"
        sx={isCurrent ? isCurrentChatStyles : notCurrentChatStyles}
        onClick={handleSelectChat}
      >
        <ListItemAvatar>
          <Badge
            color="warning"
            variant="dot"
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            invisible={invisible}
          >
            <Avatar
              alt="Seller"
              // src="https://images.generated.photos/nSW_I6izlbs1PZri0EwntItqrnybtGrDKTz9RNnnDHk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LmNvbmQvMzlkNTg3/MjMtODFhYi00Y2Zh/LTlkMjQtNTU0Njdl/NjU1MmU2LmpwZw.jpg"
              // src={chat.recipientProfilePic}
              src={`/api/image/${chat.recipientProfilePic}`}
            />
          </Badge>
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
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {chat.chatMessages.length > 0 && (
                  <>
                    {chat.chatMessages[chat.chatMessages.length - 1].userid ===
                    userStore.id
                      ? "You:"
                      : chat.recipientUsername}
                    {` – `}
                  </>
                )}
              </Typography>
              {messagePreview}
            </>
          }
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

export default ChatMenuItem;
