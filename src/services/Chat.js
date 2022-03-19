import { get, remove, update, postAsFormInput } from "./api";

import {
  URL_CREATE_CHAT,
  URL_GET_USER_CHATS,
  URL_CREATE_MESSAGE,
  URL_GET_CHAT_MESSAGES,
} from "../services/endpoints";

export const createChat = (senderId, receiverId) => {
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

export const createMessage = (chatId, userId, text) => {
  const body = {
    chatId: chatId,
    userId: userId,
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
