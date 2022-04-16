import { get, remove, update, postAsFormInput } from "./api";

import {
  URL_CREATE_CHAT,
  URL_GET_USER_CHATS,
  URL_CREATE_MESSAGE,
  URL_GET_CHAT_MESSAGES,
  URL_MARK_CHAT_AS_READ,
} from "../services/endpoints";

export const createChat = (senderId, receiverId) => {
  console.log(senderId + " " + receiverId)
  const body = {
    senderId: senderId,
    receiverId: receiverId,
  };
  return postAsFormInput(URL_CREATE_CHAT, body);
};

export const getUserChats = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_USER_CHATS, params);
};

export const createMessage = (chatId, userId, type, text) => {
  const body = {
    chatId: chatId,
    userId: userId,
    type: type,
    text: text,
  };
  return postAsFormInput(URL_CREATE_MESSAGE, body);
};

export const getChatMessages = (id) => {
  const params = {
    chatId: id,
  };
  return get(URL_GET_CHAT_MESSAGES, params);
};

export const markChatAsRead = (id) => {
  const body = {
    chatId: id,
    isUnread: "0",
  };
  return update(URL_MARK_CHAT_AS_READ, body);
};
