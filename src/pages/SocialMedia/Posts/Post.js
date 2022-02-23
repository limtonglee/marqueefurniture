import React, { useState } from "react";
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
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Comment from "./Comment";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const { username } = user;

const Post = () => {
	const post = {
		id: 0,
		image: "https://picsum.photos/200/300",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		tags: [["Living Room"], ["Minimalist"]],
		likes: ["alicetan", "bobchua", "charleswong", "dianasim"],
		comments: [
			{
				id: "0",
				user: {
					username: "alicetan",
					email: "alicetan@gmail.com",
					contactNum: "97662340",
					password: "AliceTan123",
					type: "Customer",
					profilePic: "https://picsum.photos/200/200",
					addresses: ["Address 1", "Address 2"],
				},
				comment: "That looks great",
				datetime: "",
			},
			{
				id: "2",
				user: {
					username: "bobchua",
					email: "bobchua@gmail.com",
					contactNum: "98361129",
					password: "BobChua123",
					type: "Customer",
					profilePic: "https://picsum.photos/100/100",
					addresses: ["Address 1", "Address 2"],
				},
				comment: "Very nice",
				datetime: "",
			},
		],
		products: [
			{
				id: "0",
				listingType: "Furniture",
				img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25",
				title: "Brown Sofa",
				author: "@FurnitureFirstStop",
			},
			{
				id: "1",
				listingType: "Furniture",
				img: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c",
				title: "Black Sofa",
				author: "@FurnitureLife",
			},
		],
	};

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
		console.log("click");
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

								<Button
									startIcon={<PushPinOutlinedIcon />}
									variant="outlined"
									onClick={handleClick}
									sx={addToMoodboardButtonStyles}
								>
									Add to moodboard
								</Button>
							</Box>
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
