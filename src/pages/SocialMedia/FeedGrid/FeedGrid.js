import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import PostCard from "./PostCard";

const FeedGrid = () => {
	const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(0.5),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	return (
		<Box sx={{ minWidth: 500, minHeight: 253 }}>
			<Masonry columns={4} spacing={2}>
				{heights.map((height, index) => (
					<PostCard />
				))}
			</Masonry>
			<Masonry columns={4} spacing={2}>
				{heights.map((height, index) => (
					<Item key={index} sx={{ height }}>
						{index + 1}
					</Item>
				))}
			</Masonry>
		</Box>
	);
};

export default FeedGrid;
