import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
import MoodboardModal from "../Moodboard/MoodboardModal";
import { Link } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const { username } = user;

const PostCard = ({ post, refreshPosts, sourceMoodboardId }) => {
  // const post = props.post;

  const [moodboards, setMoodboards] = useState(user.moodboards);

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

  const postInUserMoodboards = () => {
    const moodboardsWithThisPost = moodboards.filter((moodboard) => {
      for (let moodboardItem of moodboard.moodboardItems) {
        if (moodboardItem.id === post.id) {
          return true;
        }
      }
      return false;
    });
    return moodboardsWithThisPost.length > 0;
  };

  const [postPinned, setPostPinned] = useState(
    postInUserMoodboards() ? true : false
  );

  const [likesChecked, setLikesChecked] = useState(
    post.likes.includes(username)
  );

  const handleChangeForLike = (event) => {
    console.log("clicked like");
    console.log("no. of likes before clicking:", post.likes.length);
    console.log("liked by before clicking:", post.likes);
    if (post.likes.includes(username)) {
      // unlike
      // remove user from likes array
      post.likes = post.likes.filter((user) => user !== username);

      // remove this post from the user's likes
      removePostFromUserLikes();
    } else {
      // like
      // add user to likes array
      post.likes.push(username);

      // add this post to user's likes
      addPostFromUserLikes();
    }

    console.log("no. of likes after clicking:", post.likes.length);
    console.log("liked by after clicking:", post.likes);

    // update icon colour on front end
    setLikesChecked(!likesChecked);
  };

  const removePostFromUserLikes = () => {
    const newLikePostsList = [...user.likedPosts].filter(
      (item) => item.id !== post.id
    );
    user.likedPosts = newLikePostsList;
  };

  const addPostFromUserLikes = () => {
    const newLikePostsList = [...user.likedPosts, post];
    user.likedPosts = newLikePostsList;
  };

  const [open, setOpen] = React.useState(false);

  const closeMoodboardModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen(true);
  };

  useEffect(() => {
    setPostPinned(postInUserMoodboards() ? true : false);
  }, [moodboards]);

  return (
    <>
      <Card sx={{ width: 200, position: "relative" }}>
        <Link
          key={post.id}
          to={`/ideas/${post.id}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            width="100%"
            objectfit="scale-down"
            image={post.image}
            alt="post picture"
          />
        </Link>
        <CardActions sx={postCardStyles.cardActions}>
          <Checkbox
            {...label}
            icon={<PushPinOutlinedIcon fontSize="small" />}
            checkedIcon={<PushPinIcon fontSize="small" />}
            sx={postCardStyles.checkboxes}
            // onChange={handleChangeForPin}
            onClick={handleClick}
            checked={postPinned}
          />
          <Checkbox
            {...label}
            icon={<FavoriteBorder fontSize="small" />}
            checkedIcon={<Favorite fontSize="small" />}
            sx={postCardStyles.checkboxes}
            onChange={handleChangeForLike}
            checked={likesChecked}
          />
        </CardActions>
      </Card>

      <MoodboardModal
        open={open}
        closeMoodboardModal={closeMoodboardModal}
        post={post}
        moodboards={moodboards}
        setMoodboards={setMoodboards}
        postPinned={postPinned}
        refreshPosts={refreshPosts}
        sourceMoodboardId={sourceMoodboardId}
      />
    </>
  );
};

export default PostCard;
