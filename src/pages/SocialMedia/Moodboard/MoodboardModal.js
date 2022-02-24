import React from "react";
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

const MoodboardModal = ({ open, closeMoodboardModal }) => {
	const modalStyles = {
		wrapper: {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: 300,
			bgcolor: "background.paper",
			boxShadow: 24,
			p: 4,
		},
		inputFields: {
			display: "flex",
			flexDirection: "column",
			marginTop: "20px",
			marginBottom: "15px",
		},
		buttons: {
			display: "flex",
			justifyContent: "end",
		},
	};

	const { moodboards } = user;

	const handleClick = () => {
		console.log("click");
	};

	const [checked, setChecked] = React.useState([1]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
		console.log("hi", value);
		console.log("newChecked", newChecked);
	};

	return (
		<Modal
			open={open}
			onClose={closeMoodboardModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={modalStyles.wrapper}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Add post to moodboard
				</Typography>
				<Box sx={modalStyles.inputFields}>
					<List dense>
						{moodboards.map((moodboard, index) => {
							const moodboardName = moodboard.boardName;
							const labelId = `checkbox-list-secondary-label-${moodboardName}`;
							return (
								<ListItem
									key={moodboardName}
									secondaryAction={
										<Checkbox
											edge="end"
											onChange={handleToggle(
												moodboardName
											)}
											checked={
												checked.indexOf(
													moodboardName
												) !== -1
											}
											inputProps={{
												"aria-labelledby": labelId,
											}}
										/>
									}
									disablePadding
								>
									<ListItemButton sx={{ pl: 0 }}>
										<ListItemAvatar>
											<Avatar
												alt={`Avatar n°${index + 1}`}
												src={`https://picsum.photos/200`}
												sx={{ borderRadius: "10%" }}
											/>
										</ListItemAvatar>
										<ListItemText
											id={labelId}
											primary={moodboardName}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</Box>
				<Box sx={modalStyles.buttons}>
					<Button onClick={handleClick}>Submit</Button>
					<Button onClick={closeMoodboardModal}>Cancel</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default MoodboardModal;
