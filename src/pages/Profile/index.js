// @mui icons
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import * as socialMediaAPI from "../../services/SocialMedia";
import { useStores } from "../../stores/RootStore";
import FeedGrid from "../SocialMedia/FeedGrid/FeedGrid";
import ProfileInfoCard from "./About/ProfileInfoCard";
// Overview page components
import Header from "./Header";
import MoodboardViewInProfile from "./Moodboard/MoodboardViewInProfile";

function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const { userStore } = useStores();

  const [profilePic, setProfilePic] = useState(userStore.profilePic);

  //username in header component does not update
  const [userName, setUserName] = useState(userStore.name);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    console.log(newValue);
    userStore.setPrevTabOnProfile(newValue);
  };

  const [posts, setPosts] = useState([]);
  const [postsStore, setPostsStore] = useState([]); // eslint-disable-line no-unused-vars

  const getUserPosts = async () => {
    try {
      const res = await socialMediaAPI.getUserPosts(userStore.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostLikes = async (post) => {
    try {
      const res = await socialMediaAPI.getPostLikes(post.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      data = data.map((item) => item.username); // clean likes data
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostProducts = async (post) => {
    try {
      const res = await socialMediaAPI.getPostListings(post.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostTags = async (post) => {
    try {
      const res = await socialMediaAPI.getPostTags(post.id);
      let data = JSON.parse(JSON.stringify(res)).data;
      data = data.map((item) => item.tagname); // clean tags data
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPostComments = async (post) => {
    try {
      const res = await socialMediaAPI.getPostComments(post.id);
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompletePostData = async () => {
    const allPosts = await getUserPosts();

    var promises = allPosts.map(async (post) => {
      const postLikes = await getPostLikes(post);
      const postProducts = await getPostProducts(post);
      const postTags = await getPostTags(post);
      const postComments = await getPostComments(post);
      const completePost = {
        ...post,
        comments: postComments,
        likes: postLikes,
        products: postProducts,
        tags: postTags,
      };

      // console.log("completePost", completePost);
      return completePost;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("cleaned post data", values);
      // setPosts(values);

      setPosts(values.sort((a, b) => b.id - a.id));
      setPostsStore(values.sort((a, b) => b.id - a.id));

      return values;
    });
  };

  let navigate = useNavigate();
  const navigationType = useNavigationType();

  useEffect(() => {
    getCompletePostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (navigationType === "POP") {
      setTabValue(userStore.prevTabOnProfile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = () => {
    console.log("handleCreatePost");
    navigate("/new-idea");
  };

  // console.log("navigationType", navigationType); // ! string : "POP" | "PUSH" | "REPLACE"

  return (
    <Container maxWidth="xl">
      <Header name={userName} profilePic={profilePic} />
      <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
        <Box sx={{ width: "auto", bgcolor: "background" }}>
          <Tabs
            value={tabValue}
            onChange={handleSetTabValue}
            centered
            variant="fullWidth"
            sx={{ background: "white" }}
          >
            {/* <Tab label="Moodboard" icon={<AccountBoxIcon />} />
            <Tab label="Posts" icon={<MessageIcon />} />
            <Tab label="About" icon={<SettingsIcon />} /> */}
            <Tab label="Moodboard" />
            <Tab label="Posts" />
            <Tab label="About" />
          </Tabs>
          <Divider />
        </Box>
      </Grid>
      {tabValue === 0 && <MoodboardViewInProfile />}
      {tabValue === 1 && (
        <>
          <Box
            sx={{
              p: 2,
            }}
          >
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handleCreatePost}
              sx={{ mb: 3 }}
            >
              New Post
            </Button>
            <FeedGrid posts={posts} fromProfile={true} />
          </Box>
        </>
      )}
      {tabValue === 2 && (
        <Grid>
          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="username"
              description="Bio"
              website="Address"
              userName={userName}
              setUserName={setUserName}
              setProfilePic={setProfilePic}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

// Typechecking props for the Profile
Profile.propTypes = {
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
};

export default Profile;
