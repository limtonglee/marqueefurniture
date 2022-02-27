import React, { useState, useEffect } from "react";
import ReusableMasonry from "./ReusableMasonry";
import { user } from "../../../data/currentUserData";
import Box from "@mui/material/Box";

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

import Stack from "@mui/material/Stack";

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

const ViewMoodboard = () => {
	// const [moodboards, setMoodboards] = useState(user.moodboards);

	const moodboards = user.moodboards;

	// const [currentMoodboardId, setCurrentMoodboardId] = useState(
	// 	user.moodboards[0].id
	// );

	const [currentMoodboard, setCurrentMoodboard] = useState(moodboards[0]);

	const top100Films = [
		{ label: "The Shawshank Redemption", year: 1994 },
		{ label: "The Godfather", year: 1972 },
		{ label: "The Godfather: Part II", year: 1974 },
		{ label: "The Dark Knight", year: 2008 },
		{ label: "12 Angry Men", year: 1957 },
	];

	const moodboardOptions = moodboards.map((moodboard) => {
		const moodboardOption = {};
		moodboardOption.label = moodboard.boardName;
		moodboardOption.id = moodboard.id;
		return moodboardOption;
	});

	const [selectedMoodboard, setSelectedMoodboard] = useState(
		moodboardOptions[0]
	);

	const handleMoodboardChange = (event, value) => {
		setSelectedMoodboard(value);
		setCurrentMoodboard(moodboards[value.id]);
	};

	// useEffect(() => {
	// 	console.log(currentMoodboard);
	// }, [currentMoodboard]);

	return (
		<>
			<Container sx={{ pt: 2 }}>
				<Box
					sx={{
						mt: 2,
					}}
				>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={moodboardOptions}
						sx={{ width: 300 }}
						renderInput={(params) => (
							<TextField {...params} label="Moodboard" />
						)}
						defaultValue={moodboardOptions[0]}
						value={selectedMoodboard}
						onChange={handleMoodboardChange}
						disableClearable
						isOptionEqualToValue={(option, value) =>
							option.id === value.id
						}
					/>
				</Box>
				<Box>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>Board Details</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box>
								<Typography
									variant="subtitle2"
									gutterBottom
									component="div"
								>
									About
								</Typography>
								<Typography variant="body1" gutterBottom>
									{currentMoodboard.description}
								</Typography>
							</Box>
							<Box sx={{ mt: 2 }}>
								<Typography
									variant="subtitle2"
									gutterBottom
									component="div"
								>
									Tags
								</Typography>
								<Stack direction="row" spacing={1}>
									{currentMoodboard.tags.flat().map((tag) => (
										<Chip
											label={tag}
											variant="outlined"
											key={tag.toString()}
										/>
									))}
								</Stack>
							</Box>
						</AccordionDetails>
					</Accordion>
				</Box>

				<ReusableMasonry postData={currentMoodboard} />
			</Container>
		</>
	);
};

export default ViewMoodboard;
