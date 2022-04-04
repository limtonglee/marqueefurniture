import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import MoodboardModal from "../Moodboard/MoodboardModal";
import TextField from "@mui/material/TextField";
import { useStores } from "../../../stores/RootStore";

import * as socialMediaAPI from "../../../services/SocialMedia";
import * as notificationAPI from "../../../services/Notification";

import * as socket from "../../../services/socket";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const { username } = user;

const Post = () => {
  const { userStore } = useStores();
  // const socket = useRef();

  const { postId } = useParams();

  const [moodboards, setMoodboards] = useState([]);
  const [postPinned, setPostPinned] = useState(false);

  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(userStore.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getMoodboardPosts = async (moodboardId) => {
    try {
      const res = await socialMediaAPI.getMoodboardPosts(moodboardId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompleteMoodboardData = async () => {
    const allUserMoodboards = await getUserMoodboards();

    var promises = allUserMoodboards.map(async (moodboard) => {
      const moodboardPosts = await getMoodboardPosts(moodboard.id);
      const completeMoodboard = {
        ...moodboard,
        moodboardItems: moodboardPosts,
      };

      // console.log("completeMoodboard", completeMoodboard); // works
      return completeMoodboard;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("getCompleteMoodboardData values", values);
      setMoodboards(values);

      console.log(
        "postInUserMoodboards(values)??",
        postInUserMoodboards(values)
      );

      setPostPinned(postInUserMoodboards(values));

      return values;
    });
  };

  useEffect(() => {
    getCompleteMoodboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // help idk what to initialise this to
  const [post, setPost] = useState({
    id: postId,
    description: "",
    comments: [],
    image: "",
    likes: [],
    products: [],
    tags: [],
    userid: 1,
  });

  const getPostDetails = async (postId) => {
    try {
      const res = await socialMediaAPI.getPostDetails(postId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostLikes = async (postId) => {
    try {
      const res = await socialMediaAPI.getPostLikes(postId);
      const data = JSON.parse(JSON.stringify(res)).data;
      const likes = [];
      for (let user in data) {
        likes.push(data[user].username);
      }
      return likes;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostProducts = async (postId) => {
    try {
      const res = await socialMediaAPI.getPostListings(postId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostTags = async (postId) => {
    try {
      const res = await socialMediaAPI.getPostTags(postId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostComments = async (postId) => {
    try {
      const res = await socialMediaAPI.getPostComments(postId);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompletePost = async () => {
    let postDetails = await getPostDetails(postId);
    postDetails = { ...postDetails[0] };

    console.log("postDetails line 165", postDetails);

    const postLikes = await getPostLikes(postId);
    const postProducts = await getPostProducts(postId);
    const postTags = await getPostTags(postId);
    const postComments = await getPostComments(postId);
    const completePost = {
      ...postDetails,
      comments: postComments,
      likes: postLikes,
      products: postProducts,
      tags: postTags,
    };

    console.log("completePost", completePost);
    setPost(completePost);

    const postAuthor = await getAuthorUsername(postDetails.userid);
    setAuthorUsername(postAuthor);

    return completePost;
  };

  useEffect(() => {
    getCompletePost();
    // getAuthorUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // socket.current = io("ws://localhost:8900");
    socket.initiateSocket(userStore.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [likesChecked, setLikesChecked] = useState(false);

  const [postLikesCount, setPostLikesCount] = useState(0);

  useEffect(() => {
    setLikesChecked(post.likes.includes(userStore.name));
    setPostLikesCount(post.likes.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const postCardStyles = {
    cardActions: {
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    checkboxes: {
      backgroundColor: "white",
      borderRadius: "50%",
      "&.MuiCheckbox-root:hover": {
        backgroundColor: "#F2F2F2",
        borderRadius: "50%",
      },
    },
  };

  const addToMoodboardButtonStyles = {
    "&.MuiButton-root": {
      borderRadius: 1.5,
    },
    borderColor: "#2E6B75",
    color: "#2E6B75",
    "&:hover": {
      borderColor: "#F2F2F2",
    },
  };

  const pinnedToMoodboardButtonStyles = {
    "&.MuiButton-root": {
      borderRadius: 1.5,
    },
    backgroundColor: "#2E6B75",
    borderColor: "#2E6B75",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#2E6B75",
      borderColor: "#2E6B75",
      color: "#FFFFFF",
    },
  };

  const commentButtonStyles = {
    textTransform: "none",
    color: "grey !important",
    fontWeight: "normal",
  };

  const [commentActivated, setCommentActivated] = useState(false);

  const [open, setOpen] = React.useState(false);

  const closeMoodboardModal = () => {
    setOpen(false);
  };

  const likePost = async (postId, userId) => {
    const description = "has liked your post";
    const isunread = "1";
    const link = `/ideas/${post.id}`;
    const timestamp = new Date();
    const triggeruserid = userStore.id;
    const triggerusername = userStore.name;
    const userid = post.userid;
    console.log("post.userid", post.userid);
    console.log("userid", userid);
    console.log("author username", triggerusername);

    console.log(` triggeruserid ${triggeruserid} userid ${userid}`);

    // socket.current.emit("likePost", {
    //   id: timestamp,
    //   description: description,
    //   isunread: isunread,
    //   link: link,
    //   timestamp: timestamp,
    //   triggeruserid: triggeruserid,
    //   triggerUsername: triggerusername,
    //   userid: userid,
    // });

    if (post.userid !== userStore.id) {
      socket.sendLikePost({
        id: timestamp,
        description: description,
        isunread: isunread,
        link: link,
        timestamp: timestamp,
        triggeruserid: triggeruserid,
        triggerUsername: triggerusername,
        userid: userid,
      });
    }

    try {
      const res1 = await socialMediaAPI.likePost(postId, userId);
      const data1 = JSON.parse(JSON.stringify(res1)).data;
      console.log(data1);
      getCompletePost();

      if (post.userid !== userStore.id) {
        const res2 = await notificationAPI.createNotification(
          description,
          isunread,
          link,
          triggeruserid,
          userid
        );
        const data2 = JSON.parse(JSON.stringify(res2)).data;
        console.log(data2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const likePost = async (postId, userId) => {
  //   try {
  //     const res = await socialMediaAPI.likePost(postId, userId);
  //     const data = JSON.parse(JSON.stringify(res)).data;
  //     console.log(data);
  //     getCompletePost();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const unlikePost = async (postId, userId) => {
    try {
      const res = await socialMediaAPI.unlikePost(postId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      getCompletePost();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeForLike = (event) => {
    console.log("clicked like");
    console.log("no. of likes before clicking:", post.likes.length);
    console.log("liked by before clicking:", post.likes);
    console.log("post.id", post.id);
    console.log("user.id", userStore.id);

    if (post.likes.includes(userStore.name)) {
      unlikePost(post.id, userStore.id);
    } else {
      likePost(post.id, userStore.id);
    }

    console.log("no. of likes after clicking:", post.likes.length);
    console.log("liked by after clicking:", post.likes);
  };

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleAddComment = () => {
    console.log("add comment");
    setCommentActivated(true);
  };

  const postInUserMoodboards = (moodboards) => {
    const moodboardsWithThisPost = moodboards.filter((moodboard) => {
      for (let moodboardItem of moodboard.moodboardItems) {
        if (moodboardItem.id === parseInt(post.id)) {
          console.log("equal", moodboardItem.id);
          return true;
        }
      }
      return false;
    });
    return moodboardsWithThisPost.length > 0;
  };

  // const [postPinned, setPostPinned] = useState(
  //   postInUserMoodboards() ? true : false
  // );

  // useEffect(() => {
  //   setPostPinned(postInUserMoodboards() ? true : false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [moodboards]);

  const refreshData = () => {
    console.log("refreshData called");
    getCompleteMoodboardData();
    getCompletePost();
    // setPostPinned(postInUserMoodboards() ? true : false);
  };

  const [comment, setComment] = useState("");

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const sendComment = async () => {
    try {
      const res = await socialMediaAPI.createPostComment(
        comment,
        userStore.id,
        postId
      );
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      getCompletePost();
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const commentStyles = {
    username: {
      fontWeight: "bold",
    },
    comment: {
      color: "black",
    },
  };

  const [authorUsername, setAuthorUsername] = useState("");

  const getAuthorUsername = async (userId) => {
    try {
      console.log("line 434", post);
      const res = await socialMediaAPI.getUsernameById(userId);
      console.log("res", JSON.parse(JSON.stringify(res)).data[0]["username"]);
      // let data = JSON.parse(JSON.stringify(res)).data[0].username;
      let data = JSON.parse(JSON.stringify(res)).data[0]["username"];
      console.log("getAuthorUsername", data);
      // setAuthorUsername(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container sx={{ pt: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              <Card
                sx={{ width: "100%", position: "relative" }}
                onClick={() => console.log("hi")}
              >
                <CardMedia
                  component="img"
                  width="100%"
                  objectfit="scale-down"
                  // image={post.image}
                  image={`/api/image/${post.image}`}
                  alt="post picture"
                />
              </Card>
            </Grid>
            <Grid item md={6} xs={12} sx={{ px: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack direction="row">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder fontSize="small" />}
                    checkedIcon={<Favorite fontSize="small" />}
                    sx={postCardStyles.checkboxes}
                    onChange={handleChangeForLike}
                    checked={likesChecked}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>{postLikesCount}</span>
                  </Box>
                </Stack>
                {postPinned ? (
                  <Button
                    startIcon={<PushPinOutlinedIcon />}
                    onClick={handleClick}
                    sx={pinnedToMoodboardButtonStyles}
                  >
                    Pinned
                  </Button>
                ) : (
                  <Button
                    startIcon={<PushPinOutlinedIcon />}
                    variant="outlined"
                    onClick={handleClick}
                    sx={addToMoodboardButtonStyles}
                  >
                    Add to moodboard
                  </Button>
                )}
              </Box>
              <MoodboardModal
                open={open}
                closeMoodboardModal={closeMoodboardModal}
                post={post}
                moodboards={moodboards}
                setMoodboards={setMoodboards}
                postPinned={postPinned}
                refreshPosts={refreshData}
              />
              <Box sx={{ pt: 1 }}>
                <Stack direction="row" spacing={0.5}>
                  <Box sx={commentStyles.username}>{authorUsername}</Box>
                  <Box sx={commentStyles.comment}>{post.description}</Box>
                </Stack>
                {post.comments
                  .slice(0)
                  .reverse()
                  .map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      post={post}
                      setPost={setPost}
                      getCompletePost={getCompletePost}
                    />
                  ))}
              </Box>
              <Box sx={{ pt: 1, width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="profile pic"
                    src="https://picsum.photos/200"
                    sx={{ width: 24, height: 24 }}
                  />
                  {!commentActivated && (
                    <Button sx={commentButtonStyles} onClick={handleAddComment}>
                      Add a comment...
                    </Button>
                  )}
                  {commentActivated && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Type comment..."
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ width: "100%", mr: 1 }}
                        autoFocus={true}
                        onChange={updateComment}
                        value={comment}
                        autoComplete="off"
                      />
                      {comment.length === 0 ? (
                        <Button
                          endIcon={<SendIcon />}
                          variant="outlined"
                          onClick={sendComment}
                          sx={addToMoodboardButtonStyles}
                          disabled
                        >
                          Send
                        </Button>
                      ) : (
                        <Button
                          endIcon={<SendIcon />}
                          variant="outlined"
                          onClick={sendComment}
                          sx={addToMoodboardButtonStyles}
                        >
                          Send
                        </Button>
                      )}
                    </Box>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Post;
