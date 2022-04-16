import io from "socket.io-client";

let socket;
const SOCKET_URL = "http://localhost:8900";

export const initiateSocket = (userId) => {
  socket = io(SOCKET_URL);

  console.log("Connecting to socket");

  socket.emit("addUser", userId);
};

// ! SUBSCRIBING TO MESSAGE

export const subscribeToGetUser = (callback) => {
  if (!socket) {
    return;
  }

  socket.on("getUsers", (data) => {
    callback(null, data);
  });
};

export const subscribeToGetMessages = (callback) => {
  if (!socket) {
    return;
  }

  socket.on("getMessage", (data) => {
    console.log("getMessage socket.js");
    callback(null, data);
  });
};

export const subscribeToGetLikes = (callback) => {
  if (!socket) {
    return;
  }

  socket.on("likePost", (data) => {
    callback(null, data);
  });
};

export const subscribeToGetBumpChatButtonRefresh = (callback) => {
  if (!socket) {
    return;
  }

  socket.on("bumpChatButtonRefresh", (data) => {
    callback(null, data);
  });
};

export const subscribeToGetBumpDesignOrderStatusRefresh = (callback) => {
  if (!socket) {
    return;
  }

  socket.on("bumpDesignOrderStatusRefresh", (data) => {
    callback(null, data);
  });
};

// ! SENDING

export const sendMessage = (data) => {
  if (!socket) {
    return;
  }

  socket.emit("sendMessage", data);
};

export const sendLikePost = (data) => {
  if (!socket) {
    return;
  }

  socket.emit("likePost", data);
};

export const bumpChatButtonRefresh = (data) => {
  if (!socket) {
    return;
  }

  socket.emit("bumpChatButtonRefresh", data);
};

export const bumpDesignOrderStatusRefresh = (data) => {
  if (!socket) {
    return;
  }

  socket.emit("bumpDesignOrderStatusRefresh", data);
};
