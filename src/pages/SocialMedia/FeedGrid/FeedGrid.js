import React from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import PostCard from "./PostCard";

const FeedGrid = ({ posts }) => {
	console.log(posts);
	return (
		<Box sx={{ maxWidth: 1200 }}>
			<Masonry columns={4} spacing={2}>
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</Masonry>
		</Box>
	);
};

export default FeedGrid;
