import React, { useState, useEffect } from "react";
import SortButton from "../../components/SortButton";
import FilterButton from "../../components/Buttons/FilterButton";
import FeedGrid from "./FeedGrid/FeedGrid";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import * as socialMediaAPI from "../../services/SocialMedia";

const Ideas = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  let currentSort = "popular";

  const pageStyles = {
    tags: {
      p: 2,
    },
    sortFilter: {
      p: 2,
      display: "flex",
      justifyContent: "space-between",
    },
    masonry: {
      p: 2,
    },
  };

  const handleTag = async (tag) => {
    if (selectedTags.includes(tag)) {
      // remove tag from selectedTags
      const newSelectedTags = [...selectedTags].filter((item) => item !== tag);
      setSelectedTags(newSelectedTags);
    } else {
      // add tag to selectedTags
      const newSelectedTags = [...selectedTags];
      newSelectedTags.push(tag);
      setSelectedTags(newSelectedTags);
    }
  };

  const filterPosts = async () => {
    if (selectedTags.length === 0) {
      getCompletePostData();
    } else {
      setPosts(
        postsStore
          .filter(
            (post) =>
              post.tags.filter((x) => selectedTags.includes(x)).length > 0
          )
          .sort((a, b) => b.likes.length - a.likes.length)
      );
    }
  };

  useEffect(() => {
    filterPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const [posts, setPosts] = useState([]);
  const [postsStore, setPostsStore] = useState([]);

  const getAllPosts = async (post) => {
    try {
      const res = await socialMediaAPI.getAllPosts();
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
    const allPosts = await getAllPosts();

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

      // console.log("completePost", completePost); // works
      return completePost;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("cleaned post data", values); // works
      // setPosts(values); // doesnt work

      // sort posts before updating state
      if (currentSort === "popular") {
        // sorting by descending amount of likes
        setPosts(values.sort((a, b) => b.likes.length - a.likes.length));
        setPostsStore(values.sort((a, b) => b.likes.length - a.likes.length)); //new
      }
      if (currentSort === "recent") {
        // descending postId
        setPosts(values.sort((a, b) => b.id - a.id));
        setPostsStore(values.sort((a, b) => b.id - a.id));
      }

      return values;
    });
  };

  useEffect(() => {
    getCompletePostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (sortType) => {
    console.log(sortType);
    currentSort = sortType;
    sortFeed();
  };

  const sortFeed = () => {
    if (currentSort === "popular") {
      // sorting by descending amount of likes
      let newPosts = [...posts];
      setPosts(newPosts.sort((a, b) => b.likes.length - a.likes.length));
    }
    if (currentSort === "recent") {
      // descending postId
      let newPosts = [...posts];
      setPosts(newPosts.sort((a, b) => b.id - a.id));
    }
    // if (currentSort === "for you") {
    // 	// fake sort (bec dk the "for you" logic yet): ascending amount of likes
    // 	let newPosts = [...posts];
    // 	setPosts(newPosts.sort((a, b) => a.likes.length - b.likes.length));
    // }
  };

  const resetDisplay = () => {
    setSelectedTags([]);
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

  let navigate = useNavigate();

  const handleCreatePost = () => {
    console.log("handleCreatePost");
    navigate("/new-idea");
  };

  return (
    <>
      <Container sx={{ pt: 2 }}>
        <Box sx={pageStyles.sortFilter}>
          <SortButton handleSort={handleSort} variant="ideas" />
          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handleCreatePost}
              sx={addToMoodboardButtonStyles}
            >
              New Post
            </Button>
            <FilterButton handleTag={handleTag} resetDisplay={resetDisplay} />
          </Stack>
        </Box>
        <Box sx={pageStyles.masonry}>
          <FeedGrid posts={posts} />
        </Box>
      </Container>
    </>
  );
};

export default Ideas;
