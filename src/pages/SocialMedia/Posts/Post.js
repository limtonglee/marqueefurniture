import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { user } from "../../../data/currentUserData";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { postData } from "../../../data/postData";
import { useParams } from "react-router-dom";
import MoodboardModal from "../Moodboard/MoodboardModal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const { username } = user;

const Post = () => {
	const { postId } = useParams();

	// const { moodboards } = user;
	const [moodboards, setMoodboards] = useState(user.moodboards);

	const post = postData.filter((post) => post.id === parseInt(postId))[0];

	const postCardStyles = {
		cardActions: {
			position: "absolute",
			bottom: 0,
			right: 0,
		},
		checkboxes: {
			backgroundColor: "white",
			borderRadius: "50%",
			"&.MuiCheckbox-root:hover": {
				backgroundColor: "#F2F2F2",
				borderRadius: "50%",
			},
		},
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

	const pinnedToMoodboardButtonStyles = {
		"&.MuiButton-root": {
			borderRadius: 1.5,
		},
		backgroundColor: "#2E6B75",
		borderColor: "#2E6B75",
		color: "#FFFFFF",
		"&:hover": {
			backgroundColor: "#2E6B75",
			borderColor: "#2E6B75",
			color: "#FFFFFF",
		},
	};

	const commentButtonStyles = {
		textTransform: "none",
		color: "grey !important",
		fontWeight: "normal",
	};

	const [likesChecked, setLikesChecked] = useState(
		post.likes.includes(username)
	);

	const [postLikesCount, setPostLikesCount] = useState(post.likes.length);

	const [commentActivated, setCommentActivated] = useState(false);

	const [open, setOpen] = React.useState(false);

	const closeMoodboardModal = () => {
		setOpen(false);
	};

	const handleChangeForLike = (event) => {
		console.log("clicked like");
		console.log("no. of likes before clicking:", post.likes.length);
		console.log("liked by before clicking:", post.likes);
		if (post.likes.includes(username)) {
			// unlike
			// remove user from likes array
			post.likes = post.likes.filter((user) => user !== username);

			// TODO: remove this post from the user's likes
		} else {
			// like
			// add user to likes array
			post.likes.push(username);

			// TODO: add this post to user's likes
		}

		console.log("no. of likes after clicking:", post.likes.length);
		console.log("liked by after clicking:", post.likes);

		setPostLikesCount(post.likes.length);

		// update icon colour on front end
		setLikesChecked(!likesChecked);
	};

	const handleClick = (event) => {
		setOpen(true);
	};

	const handleAddComment = () => {
		console.log("add comment");
		setCommentActivated(true);
	};

	const [values, setValues] = React.useState({
		amount: "",
		password: "",
		weight: "",
		weightRange: "",
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const postInUserMoodboards = () => {
		const moodboardsWithThisPost = moodboards.filter((moodboard) => {
			for (let moodboardItem of moodboard.moodboardItems) {
				if (moodboardItem.id === post.id) {
					return true;
				}
			}
			return false;
		});
		return moodboardsWithThisPost.length > 0;
	};

	const [postPinned, setPostPinned] = useState(
		postInUserMoodboards() ? true : false
	);

	useEffect(() => {
		setPostPinned(postInUserMoodboards() ? true : false);
	}, [moodboards]);

	return (
		<>
			<Container sx={{ pt: 2 }}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={12} sx={{ px: 2 }}>
							<Card
								sx={{ width: "100%", position: "relative" }}
								onClick={() => console.log("hi")}
							>
								<CardMedia
									component="img"
									width="100%"
									objectfit="scale-down"
									image={post.image}
									alt="post picture"
								/>
							</Card>
						</Grid>
						<Grid item md={6} xs={12} sx={{ px: 2 }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Stack direction="row">
									<Checkbox
										{...label}
										icon={
											<FavoriteBorder fontSize="small" />
										}
										checkedIcon={
											<Favorite fontSize="small" />
										}
										sx={postCardStyles.checkboxes}
										onChange={handleChangeForLike}
										checked={likesChecked}
									/>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<span>{postLikesCount}</span>
									</Box>
								</Stack>
								{postPinned ? (
									<Button
										startIcon={<PushPinOutlinedIcon />}
										onClick={handleClick}
										sx={pinnedToMoodboardButtonStyles}
									>
										Pinned
									</Button>
								) : (
									<Button
										startIcon={<PushPinOutlinedIcon />}
										variant="outlined"
										onClick={handleClick}
										sx={addToMoodboardButtonStyles}
									>
										Add to moodboard
									</Button>
								)}
							</Box>
							<MoodboardModal
								open={open}
								closeMoodboardModal={closeMoodboardModal}
								post={post}
								moodboards={moodboards}
								setMoodboards={setMoodboards}
								postPinned={postPinned}
							/>
							<Box sx={{ pt: 1 }}>
								{post.comments.map((comment) => (
									<Comment
										key={comment.id}
										comment={comment}
									/>
								))}
							</Box>
							<Box sx={{ pt: 1 }}>
								<Stack
									direction="row"
									spacing={0.5}
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Avatar
										alt="profile pic"
										src="https://picsum.photos/200"
										sx={{ width: 24, height: 24 }}
									/>
									{/* <Button
										sx={commentButtonStyles}
										onClick={handleAddComment}
									>
										Add a comment...
									</Button> */}
									{!commentActivated && (
										<Button
											sx={commentButtonStyles}
											onClick={handleAddComment}
										>
											Add a comment...
										</Button>
									)}
									{commentActivated && (
										<Box>
											<FormControl
												sx={{
													width: "25ch",
													ml: 1,
												}}
												variant="standard"
											>
												<InputLabel
													htmlFor="standard-adornment-password"
													sx={{ mt: 0 }}
												>
													Type comment
												</InputLabel>
												<Input
													sx={{ mt: "0!important" }}
													id="standard-adornment-password"
													type={
														values.showPassword
															? "text"
															: "password"
													}
													value={values.password}
													onChange={handleChange(
														"password"
													)}
													endAdornment={
														<InputAdornment position="end">
															<SendIcon
																aria-label="toggle password visibility"
																onClick={
																	handleClickShowPassword
																}
																onMouseDown={
																	handleMouseDownPassword
																}
															>
																{values.showPassword ? (
																	<VisibilityOff />
																) : (
																	<Visibility />
																)}
															</SendIcon>
														</InputAdornment>
													}
												/>
											</FormControl>
										</Box>
									)}
								</Stack>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Post;
