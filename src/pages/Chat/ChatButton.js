import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../stores/RootStore";
import * as socket from "../../services/socket";
import * as chatAPI from "../../services/Chat";
import { useLocation } from "react-router-dom";

const ChatButton = () => {
  const { userStore } = useStores();

  const [userChats, setUserChats] = useState([]); // eslint-disable-line no-unused-vars
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [unreadCount, setUnreadCount] = useState(0); // eslint-disable-line no-unused-vars

  let navigate = useNavigate();

  const handleGoToChat = () => {
    navigate("/chat");
  };

  const getUserChats = async (userId) => {
    try {
      const res = await chatAPI.getUserChats(userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("chat button data", data);
      setUserChats(data);

      const unread = data.filter((chat) => chat["isunread"] === "1").length;
      console.log("unread!!!!!", unread);
      setUnreadCount(unread);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserChats(userStore.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.subscribeToGetMessages((err, data) => {
      setArrivalMessage((prev) => {
        return {
          userid: data.senderId,
          text: data.text,
          type: data.type,
          timestamp: data.timestamp,
        };
      });
    });

    socket.subscribeToGetBumpChatButtonRefresh((err, data) => {
      console.log("subscribeToGetBumpChatButtonRefresh");
      getUserChats(userStore.id);
    });
  }, [userStore.id]);

  const location = useLocation();

  useEffect(() => {
    if (arrivalMessage) {
      if (
        location.pathname !== "/chat" ||
        userStore.currentChatPerson !== arrivalMessage.userid
      ) {
        console.log("HEREEEEEEEE");
        console.log("userStore.currentChatPerson", userStore.currentChatPerson);
        const newUserChats = [...userChats];
        for (let chat in newUserChats) {
          if (
            chat.firstuserid === arrivalMessage.userid ||
            chat.seconduserid === arrivalMessage.userid
          ) {
            chat.isunread = "1";
          }
        }
        setUserChats(newUserChats);

        setUnreadCount(+1);

        // refresh
        getUserChats(userStore.id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

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
