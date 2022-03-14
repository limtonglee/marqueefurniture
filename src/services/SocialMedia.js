// for social media - ideas, moodboards

import { get, remove, update, postAsFormInput } from "./api";
import {
  URL_GET_POSTS,
  URL_GET_POST_DETAILS,
  URL_GET_POST_TAGS,
  URL_GET_POST_LIKES,
  URL_GET_POST_COMMENTS,
  URL_CREATE_POST_COMMENTS,
  URL_DELETE_POST_COMMENT,
  URL_GET_POST_LISTINGS,
  URL_CREATE_POST,
  URL_GET_USERNAME_BY_ID,
  URL_LIKE_POST,
  URL_UNLIKE_POST,
  URL_GET_TAGS,
  URL_ADD_POST_TO_MOODBOARD,
  URL_DELETE_POST_FROM_MOODBOARD,
  URL_GET_USER_MOODBOARDS,
  URL_GET_MOODBOARD_DETAILS,
  URL_GET_MOODBOARD_POSTS,
  URL_CREATE_MOODBOARD,
  // URL_CREATE_MOODBOARD_WITH_POST,
  URL_EDIT_MOODBOARD,
  URL_DELETE_MOODBOARD,
} from "../services/endpoints";

export const getAllPosts = () => {
  return get(URL_GET_POSTS);
};

export const getPostDetails = (id) => {
  const params = {
    postId: id,
  };
  return get(URL_GET_POST_DETAILS, params);
};

export const getPostTags = (id) => {
  const params = {
    postId: id,
  };
  return get(URL_GET_POST_TAGS, params);
};

export const getPostLikes = (id) => {
  const params = {
    postId: id,
  };
  return get(URL_GET_POST_LIKES, params);
};

export const getPostComments = (id) => {
  const params = {
    postId: id,
  };
  return get(URL_GET_POST_COMMENTS, params);
};

export const createPostComment = (comment, userId, postId) => {
  const params = {
    comment: comment,
    userId: userId,
    postId: postId,
  };
  return postAsFormInput(URL_CREATE_POST_COMMENTS, params);
};

export const deletePostComment = (commentId) => {
  const params = {
    commentId: commentId,
  };
  return remove(URL_DELETE_POST_COMMENT, params);
};

export const getPostListings = (id) => {
  const params = {
    postId: id,
  };
  return get(URL_GET_POST_LISTINGS, params);
};

export const createPost = (image, description, tags, products) => {
  const body = {
    image: image,
    description: description,
    tags: tags,
    products: products,
  };
  return postAsFormInput(URL_CREATE_POST, body);
};

export const getUsernamById = (userId) => {
  const params = {
    userId: userId,
  };
  return get(URL_GET_USERNAME_BY_ID, params);
};

export const likePost = (postId, userId) => {
  const body = {
    postId: postId,
    userId: userId,
  };
  return postAsFormInput(URL_LIKE_POST, body);
};

export const unlikePost = (postId, userId) => {
  const params = {
    postId: postId,
    userId: userId,
  };
  return remove(URL_UNLIKE_POST, params);
};

export const getAllTags = () => {
  return get(URL_GET_TAGS);
};

export const addPostToMoodboard = (postId, moodboardId) => {
  const body = {
    postId: postId,
    moodBoardId: moodboardId,
  };
  return postAsFormInput(URL_ADD_POST_TO_MOODBOARD, body);
};

export const deletePostFromMoodboard = (postId, moodboardId) => {
  const params = {
    postId: postId,
    moodBoardId: moodboardId,
  };
  return remove(URL_DELETE_POST_FROM_MOODBOARD, params);
};

export const getUserMoodboards = (userId) => {
  const params = {
    userId: userId,
  };
  return get(URL_GET_USER_MOODBOARDS, params);
};

export const getMoodboardPosts = (moodboardId) => {
  const params = {
    moodBoardId: moodboardId,
  };
  return get(URL_GET_MOODBOARD_POSTS, params);
};

export const createMoodboard = (boardName, description, userId) => {
  const body = {
    boardName: boardName,
    description: description,
    isPrivate: "0",
    userId: userId,
  };
  return postAsFormInput(URL_CREATE_MOODBOARD, body);
};

export const editMoodboard = (moodBoardId, boardName, description) => {
  const body = {
    moodBoardId: moodBoardId,
    boardName: boardName,
    description: description,
  };
  return update(URL_EDIT_MOODBOARD, body);
};

export const deleteMoodboard = (moodboardId) => {
  const params = {
    moodBoardId: moodboardId,
  };
  return remove(URL_DELETE_MOODBOARD, params);
};
