import React, { useState, useEffect } from "react";
import SortButton from "../../../components/SortButton";
import FilterButton from "../../../components/Buttons/FilterButton";
import FeedGrid from "../FeedGrid/FeedGrid";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
// import { postData } from "../../data/postData";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

const ReusableMasonry = ({ postData }) => {
	let selectedTags = [];
	let tagBin = new Map();
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

	const handleTag = (tag) => {
		if (selectedTags.includes(tag)) {
			// remove tag from selectedTags
			selectedTags = selectedTags.filter((item) => item !== tag);

			// update posts lists
			let newPosts = [...posts];
			newPosts.push(...tagBin.get(tag));
			setPosts(newPosts);
			// console.log("after adding back", posts);

			// delete bin for tag
			tagBin.delete(tag);
		} else {
			// add tag to selectedTags
			selectedTags.push(tag);

			// create bin for tag
			tagBin.set(tag, []);

			// update posts lists
			setPosts((oldPosts) => {
				let newPosts = oldPosts.filter((post) => {
					if (post.tags.flat().includes(tag)) {
						return true;
					} else {
						tagBin.get(tag).push(post); // add to bin for restoration later
						return false;
					}
				});
				// console.log("after removing", newPosts);
				return newPosts;
			});
		}
	};

	const [posts, setPosts] = useState(postData.moodboardItems);

	useEffect(() => {
		sortFeed();
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
			// fake sort (bec dk how datetime looks like in json): ascending amount of likes
			let newPosts = [...posts];
			setPosts(newPosts.sort((a, b) => a.id - b.id));
		}
		// if (currentSort === "for you") {
		// 	// fake sort (bec dk the "for you" logic yet): ascending amount of likes
		// 	let newPosts = [...posts];
		// 	setPosts(newPosts.sort((a, b) => a.likes.length - b.likes.length));
		// }
	};

	const resetDisplay = () => {
		setPosts(postData.moodboardItems);
		selectedTags = [];
		tagBin = new Map();
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

	const handleCreatePost = () => {
		console.log("handleCreatePost");
		window.location.replace(`new-idea`);
	};

	return (
		<>
			<Box sx={pageStyles.sortFilter}>
				<SortButton handleSort={handleSort} />
				<Stack direction="row" spacing={2}>
					<Button
						startIcon={<AddIcon />}
						variant="outlined"
						onClick={handleCreatePost}
						sx={addToMoodboardButtonStyles}
					>
						New Post
					</Button>
					<FilterButton
						handleTag={handleTag}
						resetDisplay={resetDisplay}
					/>
				</Stack>
			</Box>
			<Box sx={pageStyles.masonry}>
				<FeedGrid posts={posts} />
			</Box>
		</>
	);
};

export default ReusableMasonry;
