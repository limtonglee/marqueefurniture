import React, { useState, useEffect } from "react";
import ReusableMasonry from "./ReusableMasonry";
import { user } from "../../../data/currentUserData";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import Container from "@mui/material/Container";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import MoodboardDetailsModal from "./MoodboardDetailsModal";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

import BurstModeIcon from "@mui/icons-material/BurstMode";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useParams } from "react-router-dom";
import ProductView from "./ProductView";

const { username } = user;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ViewMoodboard = () => {
	// const moodboards = user.moodboards;

	//edit this
	// const { moodboardId } = useParams();
	// const [moodboards, setMoodboards] = useState(user.moodboards);

	// const [post, setPost] = useState(
	// 	postData.filter((post) => post.id === parseInt(postId))[0]
	// );

	const { username, moodboardId } = useParams(); // new

	// console.log("moodboardId", moodboardId);

	const [moodboards, setMoodboards] = useState(user.moodboards);
	// const [currentMoodboard, setCurrentMoodboard] = useState(moodboards[0]);

	// console.log("moodboards", moodboards);

	const [currentMoodboard, setCurrentMoodboard] = useState(
		moodboards.filter(
			(moodboard) => moodboard.id === parseInt(moodboardId)
		)[0]
	); //new

	// console.log("currentMoodboard", currentMoodboard);

	const [moodboardOptions, setMoodboardOptions] = useState(
		moodboards.map((moodboard) => {
			const moodboardOption = {};
			moodboardOption.label = moodboard.boardName;
			moodboardOption.id = moodboard.id;
			return moodboardOption;
		})
	);

	// console.log("moodboardOptions", moodboardOptions);

	const getSelectedMoodboard = () => {
		for (let moodboardOption of moodboardOptions) {
			// console.log(moodboardOption.id, parseInt(moodboardId));
			if (moodboardOption.id === parseInt(moodboardId)) {
				// console.log(moodboardOption.label);
				return moodboardOption;
			}
		}
		// console.log("none");
	};

	const [selectedMoodboard, setSelectedMoodboard] = useState(
		getSelectedMoodboard()
	);

	const handleMoodboardChange = (event, value) => {
		setSelectedMoodboard(value);
		setCurrentMoodboard(moodboards[value.id]);

		window.location.replace(`/moodboard/${username}/${value.id}`);
	};

	const createMoodboardButtonStyles = {
		"&.MuiButton-root": {
			borderRadius: 1.5,
		},
		borderColor: "#2E6B75",
		color: "#2E6B75",
		"&:hover": {
			borderColor: "#F2F2F2",
		},
		width: "100%",
	};

	const handleCreateMoodboard = () => {
		console.log("handleCreateMoodboard");
		setOpen(true);
	};

	const handleEditMoodboard = () => {
		console.log("handleEitMoodboard");
		setOpen(true);
		setIsEditing(true);
	};

	const handleDeleteMoodboard = () => {
		console.log("handleDeleteMoodboard");

		// delete from selected
		const newMoodboardOptions = [...moodboardOptions].filter(
			(item) => item.id !== currentMoodboard.id
		);
		setSelectedMoodboard(newMoodboardOptions[0]);
		setMoodboardOptions(newMoodboardOptions);

		// delete from moodboards

		const newMoodboards = [...moodboards].filter(
			(moodboard) => moodboard.id !== currentMoodboard.id
		);
		setCurrentMoodboard(newMoodboards[0]);
		setMoodboards(newMoodboards);

		handleCloseDialog();
		handleClickSnackbar("Deleted successfully");
		setExpanded(false);
	};

	const [openDialog, setOpenDialog] = React.useState(false);

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const [snackbarMessage, setSnackbarMessage] = React.useState("");

	const [openSnackbar, setOpenSnackbar] = React.useState(false);

	const handleClickSnackbar = (message) => {
		setSnackbarMessage(message);
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
		setSnackbarMessage("");
	};

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// useEffect(() => {
	// 	console.log(selectedMoodboard);
	// }, [selectedMoodboard]);

	const [open, setOpen] = React.useState(false);

	const closeMoodboardModal = () => {
		setOpen(false);
		if (isEditing) {
			setIsEditing(false);
		}
	};

	const [isEditing, setIsEditing] = React.useState(false);

	const [isPostView, setIsPostView] = React.useState(true);

	const toggleView = () => {
		setIsPostView(!isPostView);
	};

	return (
		<>
			<MoodboardDetailsModal
				open={open}
				closeMoodboardModal={closeMoodboardModal}
				moodboardToEdit={currentMoodboard}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				handleClickSnackbar={handleClickSnackbar}
			/>
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
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete this moodboard?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this moodboard? Your
						actions cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Disagree</Button>
					<Button onClick={handleDeleteMoodboard} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			<Container sx={{ pt: 2 }}>
				<Box
					sx={{
						mt: 2,
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} md={7} sx={{ display: "flex" }}>
							<Autocomplete
								disablePortal
								id="combo-box-demo"
								options={moodboardOptions}
								sx={{ width: "100%" }}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Moodboard"
										size="small"
										sx={{ p: 0 }}
									/>
								)}
								defaultValue={moodboardOptions[0]}
								value={selectedMoodboard}
								onChange={handleMoodboardChange}
								disableClearable
								isOptionEqualToValue={(option, value) =>
									option.id === value.id
								}
							/>
							{/* <IconButton
								onClick={() => {
									handleClickSnackbar("Copied to clipboard");
									navigator.clipboard.writeText(
										window.location.toString()
									);
								}}
							>
								<ShareIcon />
							</IconButton>
							{isPostView ? (
								<IconButton onClick={() => toggleView()}>
									<BurstModeIcon />
								</IconButton>
							) : (
								<IconButton onClick={() => toggleView()}>
									<ShoppingBagIcon />
								</IconButton>
							)} */}
						</Grid>

						<Grid item xs={12} md={5} sx={{ display: "flex" }}>
							<Grid item xs={9} md={9}>
								<Button
									startIcon={<AddIcon />}
									variant="outlined"
									onClick={handleCreateMoodboard}
									sx={createMoodboardButtonStyles}
								>
									New Moodboard
								</Button>
							</Grid>
							<Grid item xs={3} md={3}>
								<IconButton
									onClick={() => {
										handleClickSnackbar(
											"Copied to clipboard"
										);
										navigator.clipboard.writeText(
											window.location.toString()
										);
									}}
								>
									<ShareIcon />
								</IconButton>
								{isPostView ? (
									<IconButton onClick={() => toggleView()}>
										<BurstModeIcon />
									</IconButton>
								) : (
									<IconButton onClick={() => toggleView()}>
										<ShoppingBagIcon />
									</IconButton>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Box sx={{ mt: 2 }}>
					<Accordion
						expanded={expanded === "boarddetails"}
						onChange={handleChange("boarddetails")}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Board Details</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid container spacing={2}>
								<Grid item xs={12} md={6}>
									<Typography
										variant="subtitle2"
										component="div"
									>
										About
									</Typography>
									<Typography variant="body1">
										{currentMoodboard.description}
									</Typography>
									<Box sx={{ mt: 2 }}>
										<Typography
											variant="subtitle2"
											gutterBottom
											component="div"
										>
											Tags
										</Typography>
										<Stack direction="row" spacing={1}>
											{currentMoodboard.tags
												.flat()
												.map((tag) => (
													<Chip
														label={tag}
														variant="outlined"
														key={tag.toString()}
													/>
												))}
										</Stack>
									</Box>
								</Grid>
								<Grid item xs={12} md={3}>
									<Stack spacing={2}>
										<Button
											variant="contained"
											sx={{ width: "100%" }}
											startIcon={<EditIcon />}
											onClick={handleEditMoodboard}
											color="warning"
										>
											Edit Board
										</Button>
										<Button
											variant="contained"
											sx={{ width: "100%" }}
											startIcon={<DeleteOutlineIcon />}
											onClick={handleClickOpenDialog}
											color="error"
										>
											Delete Board
										</Button>
									</Stack>
								</Grid>
							</Grid>
						</AccordionDetails>
					</Accordion>
					{/* <IconButton onClick={() => toggleView()}>
						<ShareIcon />
					</IconButton> */}
				</Box>
				{isPostView && <ReusableMasonry moodboard={currentMoodboard} />}
				{!isPostView && <ProductView moodboard={currentMoodboard} />}
				{/* {console.log(currentMoodboard)} */}
			</Container>
		</>
	);
};

export default ViewMoodboard;
