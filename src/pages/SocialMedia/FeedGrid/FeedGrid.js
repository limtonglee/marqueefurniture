import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import PostCard from "./PostCard";
import * as socialMediaAPI from "../../../services/SocialMedia";
import { useStores } from "../../../stores/RootStore";
import MoodboardModal from "../Moodboard/MoodboardModal";
import Typography from "@mui/material/Typography";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const FeedGrid = ({ posts, refreshPosts, sourceMoodboardId, fromProfile }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  // ! -------

  const { userStore } = useStores();

  const [moodboards, setMoodboards] = useState([]);

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
      setMoodboards(values);
      return values;
    });
  };

  useEffect(() => {
    getCompleteMoodboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postInUserMoodboards = (post) => {
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

  const updatePostPinned = (post) => {
    setPostPinned(postInUserMoodboards(post) ? true : false);
  };

  // ! -------

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({ id: 0 });
  const [postPinned, setPostPinned] = useState(false);

  const closeMoodboardModal = () => {
    getCompleteMoodboardData();
    setOpen(false);
    setPost({ id: 0 });
    setPostPinned(false);
  };

  const handleClick = (event) => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ maxWidth: 1200 }}>
        {/* {posts.length === 0 && (
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <HourglassBottomIcon />
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ fontWeight: "normal", fontStyle: "italic" }}
              >
                Loading...
              </Typography>
            </Box>
          </Box>
        )} */}
        {posts.length === 0 && !fromProfile && (
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <HourglassBottomIcon />
              <Typography
                variant="h4"
                gutterBottom
                component="div"
                sx={{ fontWeight: "normal", fontStyle: "italic" }}
              >
                Loading...
              </Typography>
            </Box>
          </Box>
        )}
        {posts.length === 0 && fromProfile && (
          <Box
            sx={{
              width: "100%",
              height: 200,
              border: "1px solid #DFE3E8",
              borderRadius: 3,
              display: "flex",
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
              No posts yet
            </Typography>
          </Box>
        )}
        {isMobile ? (
          <Masonry columns={2} spacing={2}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                refreshPosts={refreshPosts}
                sourceMoodboardId={sourceMoodboardId}
                onClick={() => {
                  setPost(post);
                  setPostPinned(postInUserMoodboards(post) ? true : false);
                  handleClick();
                }}
                setOpen={setOpen}
                setPost={setPost}
                updatePostPinned={updatePostPinned}
              />
            ))}
          </Masonry>
        ) : (
          <>
            {posts.length < 4 ? (
              <Masonry columns={3} spacing={2}>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    refreshPosts={refreshPosts}
                    sourceMoodboardId={sourceMoodboardId}
                    onClick={() => {
                      setPost(post);
                      setPostPinned(postInUserMoodboards(post) ? true : false);
                      handleClick();
                    }}
                    setOpen={setOpen}
                    setPost={setPost}
                    updatePostPinned={updatePostPinned}
                  />
                ))}
              </Masonry>
            ) : (
              <Masonry columns={4} spacing={2}>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    refreshPosts={refreshPosts}
                    sourceMoodboardId={sourceMoodboardId}
                    onClick={() => {
                      setPost(post);
                      setPostPinned(postInUserMoodboards(post) ? true : false);
                      handleClick();
                    }}
                    setOpen={setOpen}
                    setPost={setPost}
                    updatePostPinned={updatePostPinned}
                  />
                ))}
              </Masonry>
            )}
          </>
        )}
      </Box>
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

export default FeedGrid;
