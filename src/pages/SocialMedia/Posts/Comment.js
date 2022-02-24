import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Comment = ({ comment }) => {
	const commentStyles = {
		username: {
			fontWeight: "bold",
		},
		comment: {
			color: "black",
		},
	};

	return (
		<>
			<Stack direction="row" spacing={0.5}>
				<Box sx={commentStyles.username}>{comment.user.username}</Box>
				<Box sx={commentStyles.comment}>{comment.comment}</Box>
			</Stack>
		</>
	);
};

export default Comment;
