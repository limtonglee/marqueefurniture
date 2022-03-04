import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import { user } from "../../../data/currentUserData";
import user from "../../../data/currentUserData2";
import Button from "@mui/material/Button";

const { username } = user;

const Comment = ({ comment, post, setPost }) => {
	const commentStyles = {
		username: {
			fontWeight: "bold",
		},
		comment: {
			color: "black",
		},
	};

	const deleteComment = () => {
		console.log("delete comment");

		const newPost = { ...post };
		newPost.comments = [...newPost.comments].filter(
			(postComment) => postComment.id !== comment.id
		);
		setPost(newPost);
	};

	return (
		<>
			{comment.user.username === username ? (
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Stack direction="row" spacing={0.5}>
						<Box sx={commentStyles.username}>
							{comment.user.username}
						</Box>
						<Box sx={commentStyles.comment}>{comment.comment}</Box>
					</Stack>
					<Button
						size="small"
						sx={{ lineHeight: "normal" }}
						onClick={deleteComment}
					>
						Delete
					</Button>
				</Box>
			) : (
				<Stack direction="row" spacing={0.5}>
					<Box sx={commentStyles.username}>
						{comment.user.username}
					</Box>
					<Box sx={commentStyles.comment}>{comment.comment}</Box>
				</Stack>
			)}
		</>
	);
};

export default Comment;
