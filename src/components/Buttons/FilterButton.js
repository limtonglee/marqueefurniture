import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NewTag from "../Tags/NewTag";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

let previousDesignTags = [];

const FilterButton = ({ tags, handleTag, clearAllFilters }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		console.log("click");
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const filterButtonStyles = {
		"&.MuiButton-root": {
			borderRadius: 1.5,
		},
		borderColor: "#2E6B75",
		color: "#2E6B75",
		"&:hover": {
			borderColor: "#F2F2F2",
		},
	};

	const designTags = [
		{ id: 0, title: "Art Deco" },
		{ id: 1, title: "Asian Zen" },
		{ id: 2, title: "Bohemian" },
		{ id: 3, title: "Coastal" },
		{ id: 4, title: "Contemporary" },
		{ id: 5, title: "Eclectic" },
		{ id: 6, title: "French Country" },
		{ id: 7, title: "Industrial" },
		{ id: 8, title: "Meditarranean" },
		{ id: 9, title: "Minimalist" },
		{ id: 10, title: "Modern" },
		{ id: 11, title: "Modern Farmhouse" },
		{ id: 12, title: "Rustic" },
		{ id: 13, title: "Scandinavian" },
		{ id: 14, title: "Shabby Chic" },
		{ id: 15, title: "Traditional" },
		{ id: 16, title: "Transitional" },
	];

	return (
		<>
			<Button
				aria-describedby={id}
				startIcon={<FilterAltOutlinedIcon />}
				variant="outlined"
				onClick={handleClick}
				sx={filterButtonStyles}
			>
				Filter
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Box sx={{ py: 2, px: 2, minWidth: 350 }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography
							variant="h6"
							gutterBottom
							component="div"
							sx={{ m: 0 }}
						>
							Filter by more categories
						</Typography>
						<Button size="small" onClick={clearAllFilters}>
							Clear All
						</Button>
					</Box>
					<Box sx={{ mt: 3 }}>
						<Autocomplete
							multiple
							limitTags={2}
							id="room-type"
							options={designTags}
							getOptionLabel={(option) => option.title}
							defaultValue={[]}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Filter by room type"
									placeholder="Search room type"
								/>
							)}
							isOptionEqualToValue={(option, value) =>
								option.id === value.id
							}
							onChange={(e, value) => {
								let changedTag = "";
								if (value.length < previousDesignTags.length) {
									changedTag = previousDesignTags.filter(
										(x) => !value.includes(x)
									)[0].title;
								} else {
									console.log("previous", previousDesignTags);
									console.log("new values", value);
									changedTag = value.filter(
										(x) => !previousDesignTags.includes(x)
									)[0].title;
								}
								handleTag(changedTag);
								previousDesignTags = value;
								console.log(
									"updated previousDesignTags",
									previousDesignTags
								);
							}}
							sx={{ width: "500px" }}
						/>
					</Box>

					{/* <Typography variant="subtitle1">Room Tags</Typography>
					<Box sx={{ maxWidth: 300 }}>
						<Stack
							direction="row"
							sx={{
								flexWrap: "wrap",
								justifyContent: "flex-start",
							}}
						>
							{tags.map((tag, index) => {
								return (
									<NewTag
										key={index}
										tag={tag}
										handleTag={handleTag}
									></NewTag>
								);
							})}
						</Stack>
					</Box> */}
				</Box>
			</Popover>
		</>
	);
};

export default FilterButton;
