import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import SortButton from "../../components/SortButton";
import FilterButton from "../../components/Buttons/FilterButton";
import FeedGrid from "./FeedGrid/FeedGrid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { postData } from "../../data/postData";
// import NewTag from "../../components/Tags/NewTag";
import tagsData from "../../data/tagsData";

let selectedTags = [];
const tagBin = new Map();
let currentSort = "popular";

const Ideas = () => {
	// const tags = ["Living Room", "Cosy", "Wood", "Kitchen"];

	// const tags = [
	// 	{
	// 		tagName: "Living Room",
	// 		selected: "false",
	// 		toggleSelected() {
	// 			console.log("toggleSelected");
	// 			this.selected = !this.selected;
	// 		},
	// 	},
	// 	{
	// 		tagName: "Cosy",
	// 		selected: "false",
	// 		toggleSelected() {
	// 			this.selected = !this.selected;
	// 		},
	// 	},
	// 	{
	// 		tagName: "Wood",
	// 		selected: "false",
	// 		toggleSelected() {
	// 			this.selected = !this.selected;
	// 		},
	// 	},
	// 	{
	// 		tagName: "Kitchen",
	// 		selected: "false",
	// 		toggleSelected() {
	// 			this.selected = !this.selected;
	// 		},
	// 	},
	// ];

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
		console.log(tag);
		if (selectedTags.includes(tag)) {
			// remove tag from selectedTags
			selectedTags = selectedTags.filter((item) => item !== tag);

			// update posts lists
			let newPosts = [...posts];
			newPosts.push(...tagBin.get(tag));
			setPosts(newPosts);
			console.log("after adding back", posts);

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
					if (post.roomTags.includes(tag)) {
						return true;
					} else {
						tagBin.get(tag).push(post); // add to bin for restoration later
						return false;
					}
				});
				console.log("after removing", newPosts);
				return newPosts;
			});
		}
	};

	const [posts, setPosts] = useState(postData);

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
			setPosts(newPosts.sort((a, b) => b.likes - a.likes));
		}
		if (currentSort === "recent") {
			// fake sort (bec dk how datetime looks like in json): ascending amount of likes
			let newPosts = [...posts];
			setPosts(newPosts.sort((a, b) => a.likes - b.likes));
		}
		if (currentSort === "for you") {
			// fake sort (bec dk the "for you" logic yet): ascending amount of likes
			let newPosts = [...posts];
			setPosts(newPosts.sort((a, b) => a.likes - b.likes));
		}
	};

	const clearAllFilters = () => {
		console.log("reached clearAllFilters() in Ideas.js");
		selectedTags.forEach((tag) => {
			handleTag(tag); // works but doesn't update styling
		});
	};

	return (
		<>
			<Container sx={{ pt: 2 }}>
				{/* <Box sx={pageStyles.tags}>
					<Stack direction="row">
						Showing ideas for
						{selectedTags.map((tag, index) => {
							return (
								<NewTag
									key={index}
									tag={tag}
									handleTag={handleTag}
								></NewTag>
							);
						})}
					</Stack>
				</Box>
				<Box sx={pageStyles.tags}>
					<Stack direction="row">
						{tags.map((tag, index) => {
							return (
								<NewTag
									key={index}
									tag={tag}
									handleTag={handleTag}
								></NewTag>
							);
						})}
					</Stack>
				</Box> */}
				<Box sx={pageStyles.sortFilter}>
					<SortButton handleSort={handleSort} />
					<FilterButton
						tags={tagsData}
						handleTag={handleTag}
						clearAllFilters={clearAllFilters}
					/>
				</Box>
				<Box sx={pageStyles.masonry}>
					<FeedGrid posts={posts} />
				</Box>
			</Container>
		</>
	);
};

export default Ideas;
