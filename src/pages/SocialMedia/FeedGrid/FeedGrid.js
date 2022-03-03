import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import PostCard from "./PostCard";

const FeedGrid = ({ posts, refreshPosts, sourceMoodboardId }) => {
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

	return (
		<Box sx={{ maxWidth: 1200 }}>
			{isMobile ? (
				<Masonry columns={2} spacing={2}>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							refreshPosts={refreshPosts}
							sourceMoodboardId={sourceMoodboardId}
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
						/>
					))}
				</Masonry>
			)}
		</Box>
	);
};

export default FeedGrid;
