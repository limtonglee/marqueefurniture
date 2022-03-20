import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Chatbox from "./Chatbox";
import ChatMenu from "./ChatMenu";

import * as chatAPI from "../../services/Chat";
import * as socialMediaAPI from "../../services/SocialMedia";

import { useStores } from "../../stores/RootStore";

const Messenger = () => {
  const { userStore } = useStores();

  const [isMobile, setIsMobile] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({
    currentChatId: "",
    recipientUsername: "",
    recipientProfilePic: "",
    chatMessages: [],
  });

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    handleResize();
    getUserChats();
  }, []);

  // const getUserChats = async () => {
  //   try {
  //     const res = await chatAPI.getUserChats(userStore.id);
  //     const data = JSON.parse(JSON.stringify(res)).data;
  //     const chat = data[data.length - 1];
  //     setCurrentChatId(chat.id);
  //     setCurrentRecipientId(
  //       chat.firstuserid === userStore.id ? chat.seconduserid : chat.firstuserid
  //     );
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getUsernameById = async (userId) => {
    try {
      const res = await socialMediaAPI.getUsernameById(userId);
      let data = JSON.parse(JSON.stringify(res)).data[0].username;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getProfilePicById = async (userId) => {
    try {
      const res = await socialMediaAPI.getProfilePicById(userId);
      let data = JSON.parse(JSON.stringify(res)).data[0].profilepic;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserChats = async (userId) => {
    try {
      const res = await chatAPI.getUserChats(userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
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

  const getUserChatsWithUsername = async () => {
    const userChats = await getUserChats(userStore.id);

    var promises = userChats.map(async (chat) => {
      const id =
        chat.firstuserid === userStore.id
          ? chat.seconduserid
          : chat.firstuserid;
      const recipientUsername = await getUsernameById(id);
      const recipientProfilePic = await getProfilePicById(id);

      const chatMessages = await getChatMessages(chat.id);

      const chatWithRecipientUsername = {
        ...chat,
        recipientUsername: recipientUsername,
        recipientProfilePic: recipientProfilePic,
        chatMessages: chatMessages,
      };

      return chatWithRecipientUsername;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("cleaned data", values);
      setUserChats(values);

      setCurrentChat(values[values.length - 1]);

      return values;
    });
  };

  useEffect(() => {
    getUserChatsWithUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshCurrentChat = async () => {
    const updatedChatMessages = await getChatMessages(currentChat.id);

    const updatedChatWithRecipientUsername = {
      ...currentChat,
      chatMessages: updatedChatMessages,
    };

    setCurrentChat(updatedChatWithRecipientUsername);
  };

  return (
    <>
      {isMobile ? (
        <Box sx={{ height: "80vh" }}>
          <ChatMenu
            userChats={userChats}
            currentChatId={currentChat.id}
            setCurrentChat={setCurrentChat}
          />
        </Box>
      ) : (
        <Container sx={{ height: "90vh" }}>
          <Grid container spacing={3} sx={{ height: "100%" }}>
            <Grid item xs={4} md={4} sx={{ height: "100%" }}>
              <Box sx={{ height: "100%" }}>
                <ChatMenu
                  userChats={userChats}
                  currentChatId={currentChat.id}
                  setCurrentChat={setCurrentChat}
                />
              </Box>
            </Grid>
            <Grid item xs={8} md={8} sx={{ height: "100%" }}>
              <Box sx={{ height: "100%" }}>
                <Chatbox
                  currentChat={currentChat}
                  refreshCurrentChat={refreshCurrentChat}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Messenger;
