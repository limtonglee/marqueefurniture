import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { user } from "../../../data/currentUserData";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MoodboardModal = ({
	open,
	closeMoodboardModal,
	post,
	moodboards,
	setMoodboards,
	postPinned,
}) => {
	const modalStyles = {
		wrapper: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			bgcolor: "background.paper",
			boxShadow: 24,
			p: 4,
			width: 350,
			borderRadius: 2,
		},
		contents: {
			display: "flex",
			flexDirection: "column",
			marginTop: "20px",
			marginBottom: "15px",
			justifyContent: "flex-start",
		},
		buttons: {
			display: "flex",
			justifyContent: "end",
		},
	};

	// const { moodboards } = user;

	const [checked, setChecked] = useState([]);
	const [prevChecked, setPrevChecked] = useState([]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const forceToggle = (value) => {
		console.log("FORCE TOGGLEEE");
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
			console.log("a");
		} else {
			newChecked.splice(currentIndex, 1);
			console.log("b");
		}

		setChecked([...newChecked]);
		console.log("supposed newChecked", newChecked);
		console.log("but it's not updated into the state leh", checked);
	};

	const addPostToMoodboard = () => {
		const newMoodboardList = [...moodboards].filter(
			(moodboard) => !checked.includes(moodboard.id)
		);

		for (let moodboardId of checked) {
			const moodboard = moodboards.filter(
				(moodboard) => moodboard.id === moodboardId
			)[0];
			moodboard.moodboardItems.push(post);
			newMoodboardList.push(moodboard);
		}
		setMoodboards(newMoodboardList);
		closeMoodboardModal();
		console.log(moodboards);

		setPrevChecked(checked);

		handleClickSnackbar();
	};

	const addPostToNewMoodboard = () => {
		console.log("addPostToNewMoodboard");
		console.log("original moodboards", moodboards);
		const newId = Math.floor(Math.random() * 100 + 1);

		forceToggle(newId);

		const newMoodboard = {
			id: newId,
			boardName: "New board",
			description: "",
			tags: [[], []],
			isPrivate: false,
			moodboardItems: [],
		};

		newMoodboard.moodboardItems.push(post);

		const newMoodboardList = [...moodboards, newMoodboard];

		// update moodboard state
		setMoodboards(newMoodboardList);
		closeMoodboardModal();
		console.log(moodboards);

		setPrevChecked(checked);

		handleClickSnackbar();
	};

	const updatePostPinnedLocations = () => {
		if (checked.length === 0) {
			console.log("no board selected");
		}
		console.log("updatePostPinnedLocations");
		const unchanged = prevChecked.filter((x) => checked.includes(x));
		const toRemovePostFrom = prevChecked.filter(
			(x) => !checked.includes(x)
		);
		const toAddPostTo = checked.filter((x) => !prevChecked.includes(x));

		console.log("unchanged", unchanged);
		console.log("toRemovePostFrom", toRemovePostFrom);
		console.log("toAddPostTo", toAddPostTo);

		const newMoodboardList = [...moodboards];
		for (let moodboard of newMoodboardList) {
			if (toRemovePostFrom.includes(moodboard.id)) {
				const newMbPosts = [...moodboard.moodboardItems].filter(
					(item) => item.id !== post.id
				);
				moodboard.moodboardItems = newMbPosts;
			}
			if (toAddPostTo.includes(moodboard.id)) {
				moodboard.moodboardItems = [...moodboard.moodboardItems, post];
			}
		}

		// update moodboard state
		setMoodboards(newMoodboardList);
		closeMoodboardModal();
		console.log(moodboards);

		setPrevChecked(checked);

		handleClickSnackbar();
	};

	const [openSnackbar, setOpenSnackbar] = React.useState(false);

	const handleClickSnackbar = () => {
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};

	useEffect(() => {
		if (postPinned && checked.length === 0) {
			moodboards.forEach((moodboard) => {
				for (let moodboardItem of moodboard.moodboardItems) {
					if (moodboardItem.id === post.id) {
						checked.push(moodboard.id);
					}
				}
			});
			setPrevChecked(checked);
		}
	}, []);

	// useEffect(() => {
	// 	console.log(moodboards);
	// }, [moodboards]);

	const noChangeMade = () => {
		return (
			prevChecked.filter((x) => !checked.includes(x)).length === 0 &&
			checked.filter((x) => !prevChecked.includes(x)).length === 0
		);
	};

	return (
		<>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={2500}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				key={"top" + "center"}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="success"
					sx={{ width: "100%" }}
				>
					Updated successfully
				</Alert>
			</Snackbar>
			{!postPinned && (
				<Modal
					open={open}
					onClose={() => {
						closeMoodboardModal();
						setChecked(prevChecked);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyles.wrapper}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
							>
								Add post to moodboard
							</Typography>
							<IconButton
								aria-label="delete"
								onClick={closeMoodboardModal}
							>
								<CloseIcon />
							</IconButton>
						</Box>

						<Box sx={modalStyles.contents}>
							<List dense>
								{moodboards.map((moodboard, index) => {
									const moodboardName = moodboard.boardName;
									const moodboardId = moodboard.id;
									const labelId = `checkbox-list-secondary-label-${moodboardName}`;
									return (
										<ListItem
											key={moodboardId}
											secondaryAction={
												<Checkbox
													edge="end"
													onChange={handleToggle(
														moodboardId
													)}
													checked={
														checked.indexOf(
															moodboardId
														) !== -1
													}
													inputProps={{
														"aria-labelledby":
															labelId,
													}}
												/>
											}
											disablePadding
										>
											<ListItemButton sx={{ pl: 0 }}>
												<ListItemAvatar>
													<Avatar
														alt={`Avatar n°${
															index + 1
														}`}
														src={`https://picsum.photos/200`}
														sx={{
															borderRadius: "10%",
														}}
													/>
												</ListItemAvatar>
												<ListItemText
													id={moodboardId}
													primary={moodboardName}
												/>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						</Box>
						<Box>
							<Button
								size="small"
								onClick={addPostToNewMoodboard}
							>
								Add to new moodboard
							</Button>
						</Box>
						<Box sx={modalStyles.contents}>
							{checked.length === 0 ? (
								<Button
									size="small"
									variant="contained"
									onClick={addPostToMoodboard}
									disabled
								>
									Add
								</Button>
							) : (
								<Button
									size="small"
									variant="contained"
									onClick={addPostToMoodboard}
								>
									Add
								</Button>
							)}
						</Box>
					</Box>
				</Modal>
			)}
			{postPinned && (
				<Modal
					open={open}
					onClose={() => {
						closeMoodboardModal();
						setChecked(prevChecked);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyles.wrapper}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
							>
								Pinned to moodboard
							</Typography>
							<IconButton
								aria-label="delete"
								onClick={closeMoodboardModal}
							>
								<CloseIcon />
							</IconButton>
						</Box>

						<Box sx={modalStyles.contents}>
							<List dense>
								{moodboards.map((moodboard, index) => {
									const moodboardName = moodboard.boardName;
									const moodboardId = moodboard.id;
									const labelId = `checkbox-list-secondary-label-${moodboardName}`;
									return (
										<ListItem
											key={moodboardId}
											secondaryAction={
												<Checkbox
													edge="end"
													onChange={handleToggle(
														moodboardId
													)}
													checked={
														checked.indexOf(
															moodboardId
														) !== -1
													}
													inputProps={{
														"aria-labelledby":
															labelId,
													}}
												/>
											}
											disablePadding
										>
											<ListItemButton sx={{ pl: 0 }}>
												<ListItemAvatar>
													<Avatar
														alt={`Avatar n°${
															index + 1
														}`}
														src={`https://picsum.photos/200`}
														sx={{
															borderRadius: "10%",
														}}
													/>
												</ListItemAvatar>
												<ListItemText
													id={moodboardId}
													primary={moodboardName}
												/>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						</Box>
						<Box>
							<Button
								size="small"
								onClick={addPostToNewMoodboard}
							>
								Add to new moodboard
							</Button>
						</Box>
						<Box sx={modalStyles.contents}>
							{noChangeMade() ? (
								<Button
									size="small"
									variant="contained"
									onClick={updatePostPinnedLocations}
									disabled
								>
									Update
								</Button>
							) : (
								<Button
									size="small"
									variant="contained"
									onClick={updatePostPinnedLocations}
								>
									Update
								</Button>
							)}
						</Box>
					</Box>
				</Modal>
			)}
		</>
	);
};

export default MoodboardModal;
