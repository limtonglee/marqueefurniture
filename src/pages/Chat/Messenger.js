import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Chatbox from "./Chatbox";
import ChatMenu from "./ChatMenu";

import * as chatAPI from "../../services/Chat";
import * as socialMediaAPI from "../../services/SocialMedia";

import * as socket from "../../services/socket";

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
  // const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    // socket.current.on("getMessage", (data) => {
    //   setArrivalMessage({
    //     userid: data.senderId,
    //     text: data.text,
    //     type: data.type,
    //     timestamp: data.timestamp,
    //   });
    // });

    // socket.initiateSocket(userStore.id);
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
  }, []);

  useEffect(() => {
    arrivalMessage &&
      (currentChat.firstuserid === arrivalMessage.userid ||
        currentChat.seconduserid === arrivalMessage.userid) &&
      setCurrentChat((prev) => {
        const newChatMessages = [...currentChat.chatMessages, arrivalMessage];
        return { ...prev, chatMessages: newChatMessages };
      });

    arrivalMessage && refreshUserChatsWithoutUpdatingCurrentChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

  // useEffect(() => {
  //   socket.current.emit("addUser", userStore.id);
  //   socket.current.on("getUsers", (users) => {
  //     console.log("getUsers", users);
  //   });
  // }, [userStore]);

  // useEffect(() => {
  //   socket.current.on("welcome", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

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

      // setCurrentChat(values[values.length - 1]);

      if (values.length > 0) {
        setCurrentChat(values[values.length - 1]);
      }

      return values;
    });
  };

  const refreshUserChatsWithoutUpdatingCurrentChat = async () => {
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
    refreshUserChatsWithoutUpdatingCurrentChat();
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
                  refreshData={refreshUserChatsWithoutUpdatingCurrentChat}
                />
              </Box>
            </Grid>
            <Grid item xs={8} md={8} sx={{ height: "100%" }}>
              <Box sx={{ height: "100%" }}>
                {userChats.length > 0 ? (
                  <Chatbox
                    currentChat={currentChat}
                    // refreshCurrentChat={refreshCurrentChat}
                    refreshCurrentChat={refreshCurrentChat}
                    // socket={socket}
                  />
                ) : (
                  <Box
                    sx={{
                      bgcolor: "#f2f2f2",
                      height: "100%",
                      border: "1px solid lightgrey",
                      borderRadius: 1,
                      display: "flex",
                      flexDirection: "column",
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
                )}
                {/* <Chatbox
                  currentChat={currentChat}
                  refreshCurrentChat={refreshCurrentChat}
                /> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Messenger;
