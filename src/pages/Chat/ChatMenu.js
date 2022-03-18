import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

import List from "@mui/material/List";

import ChatMenuItem from "./ChatMenuItem";

import * as chatAPI from "../../services/Chat";
import * as socialMediaAPI from "../../services/SocialMedia";

import { useStores } from "../../stores/RootStore";

const ChatMenu = ({ userChats, currentChatId, setCurrentChat }) => {
  const { userStore } = useStores();

  const [searchTerm, setSearchTerm] = useState("");

  // const [userChats, setUserChats] = useState([]);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  // const getUsernameById = async (userId) => {
  //   try {
  //     const res = await socialMediaAPI.getUsernameById(userId);
  //     let data = JSON.parse(JSON.stringify(res)).data[0].username;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getProfilePicById = async (userId) => {
  //   try {
  //     const res = await socialMediaAPI.getProfilePicById(userId);
  //     let data = JSON.parse(JSON.stringify(res)).data[0].profilepic;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getUserChats = async (userId) => {
  //   try {
  //     const res = await chatAPI.getUserChats(userId);
  //     const data = JSON.parse(JSON.stringify(res)).data;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getChatMessages = async (chatId) => {
  //   try {
  //     const res = await chatAPI.getChatMessages(chatId);
  //     const data = JSON.parse(JSON.stringify(res)).data;
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getUserChatsWithUsername = async () => {
  //   const userChats = await getUserChats(userStore.id);

  //   var promises = userChats.map(async (chat) => {
  //     const id =
  //       chat.firstuserid === userStore.id
  //         ? chat.seconduserid
  //         : chat.firstuserid;
  //     const recipientUsername = await getUsernameById(id);
  //     const recipientProfilePic = await getProfilePicById(id);

  //     const chatMessages = await getChatMessages(chat.id);

  //     const chatWithRecipientUsername = {
  //       ...chat,
  //       recipientUsername: recipientUsername,
  //       recipientProfilePic: recipientProfilePic,
  //       chatMessages: chatMessages,
  //     };

  //     return chatWithRecipientUsername;
  //   });

  //   await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

  //   Promise.all(promises).then((values) => {
  //     console.log("cleaned data", values);
  //     setUserChats(values);

  //     return values;
  //   });
  // };

  // useEffect(() => {
  //   getUserChatsWithUsername();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
          {userChats
            .slice(0)
            .reverse()
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
    </>
  );
};

export default ChatMenu;
