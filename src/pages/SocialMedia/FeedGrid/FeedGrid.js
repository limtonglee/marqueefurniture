import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import PostCard from "./PostCard";

const FeedGrid = () => {
	const images = [
		"https://picsum.photos/200/300",
		"https://picsum.photos/200/200",
		"https://picsum.photos/300/400",
		"https://picsum.photos/300/200",
		"https://picsum.photos/300/300",
		"https://picsum.photos/300/400",
		"https://picsum.photos/400/600",
		"https://picsum.photos/700/600",
		"https://picsum.photos/700/500",
		"https://picsum.photos/500/700",
		"https://picsum.photos/600/700",
	];

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(0.5),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	return (
		<Box sx={{ maxWidth: 1200 }}>
			<Masonry columns={4} spacing={2}>
				{images.map((img, index) => (
					<PostCard img={img} />
				))}
			</Masonry>
		</Box>
	);
};

export default FeedGrid;
