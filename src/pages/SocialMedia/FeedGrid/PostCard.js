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
import * as socialMediaAPI from "../../../services/SocialMedia";
import { createNumericLiteral } from "typescript";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const { username } = user;

const PostCard = ({ post, refreshPosts, sourceMoodboardId }) => {
  // const post = props.post;

  const [moodboards, setMoodboards] = useState([]);

  const getUserMoodboards = async () => {
    try {
      const res = await socialMediaAPI.getUserMoodboards(user.id);
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
      setMoodboards(values);
      return values;
    });
  };

  const updateIfPostIsLikedByUser = async () => {
    try {
      const res = await socialMediaAPI.getPostLikes(post.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      data = data.map((item) => item.username); // clean likes data

      // console.log(
      //   `postId ${post.id} is liked by user? ${data.includes(username)}`
      // );
      setLikesChecked(data.includes(username) ? true : false);
      // return data.includes(username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompleteMoodboardData();
    setPostPinned(postInUserMoodboards() ? true : false);
    // setLikesChecked(postIsLikedByUser()); // new
    updateIfPostIsLikedByUser();
  }, []);

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

  const [postPinned, setPostPinned] = useState(false);

  const [likesChecked, setLikesChecked] = useState(false);

  useEffect(() => {
    setPostPinned(postInUserMoodboards() ? true : false);
    // setLikesChecked(postIsLikedByUser()); // new
    updateIfPostIsLikedByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moodboards]);

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
        backgroundColor: "grey.200",
        borderRadius: "50%",
      },
    },
  };

  const likePost = async (postId, userId) => {
    try {
      const res = await socialMediaAPI.likePost(postId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      updateIfPostIsLikedByUser();
    } catch (error) {
      console.error(error);
    }
  };

  const unlikePost = async (postId, userId) => {
    try {
      const res = await socialMediaAPI.unlikePost(postId, userId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log(data);
      updateIfPostIsLikedByUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeForLike = (event) => {
    console.log("clicked like");
    console.log("no. of likes before clicking:", post.likes.length);
    console.log("liked by before clicking:", post.likes);
    console.log("post.id", post.id);
    console.log("user.id", user.id);

    if (likesChecked) {
      console.log("unlike");
      setLikesChecked(false);
      unlikePost(post.id, user.id);
    } else {
      console.log("like");
      setLikesChecked(true);
      likePost(post.id, user.id);
    }

    console.log("no. of likes after clicking:", post.likes.length);
    console.log("liked by after clicking:", post.likes);
  };

  const [open, setOpen] = React.useState(false);

  const closeMoodboardModal = () => {
    getCompleteMoodboardData();
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen(true);
  };

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
