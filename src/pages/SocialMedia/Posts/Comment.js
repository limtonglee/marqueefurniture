import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
import Button from "@mui/material/Button";

import * as socialMediaAPI from "../../../services/SocialMedia";

const { username } = user;

const Comment = ({ comment, post, setPost, getCompletePost }) => {
  const commentStyles = {
    username: {
      fontWeight: "bold",
    },
    comment: {
      color: "black",
    },
  };

  // const deleteComment = () => {
  //   console.log("delete comment");

  //   const newPost = { ...post };
  //   newPost.comments = [...newPost.comments].filter(
  //     (postComment) => postComment.id !== comment.id
  //   );
  //   setPost(newPost);
  // };

  const deleteComment = async (commentId) => {
    try {
      const res = await socialMediaAPI.deletePostComment(commentId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      getCompletePost();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {comment.username === username ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={0.5}>
            <Box sx={commentStyles.username}>{comment.username}</Box>
            <Box sx={commentStyles.comment}>{comment.comment}</Box>
          </Stack>
          <Button
            size="small"
            sx={{ lineHeight: "normal" }}
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </Button>
        </Box>
      ) : (
        <Stack direction="row" spacing={0.5}>
          <Box sx={commentStyles.username}>{comment.username}</Box>
          <Box sx={commentStyles.comment}>{comment.comment}</Box>
        </Stack>
      )}
    </>
  );
};

export default Comment;
