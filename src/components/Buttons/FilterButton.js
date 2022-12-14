import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const FilterButton = ({ handleTag, resetDisplay }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const [filterRoomValues, setfilterRoomValues] = useState([]);
	const [filterDesignValues, setfilterDesignValues] = useState([]);

	const [prevRoomTags, setPrevRoomTags] = useState([]);
	const [prevDesignTags, setPrevDesignTags] = useState([]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChangeForFilterRoom = (event, value) => {
		setfilterRoomValues(value);

		let changedTag = "";
		if (value.length < prevRoomTags.length) {
			changedTag = prevRoomTags.filter((x) => !value.includes(x))[0]
				.title;
		} else {
			changedTag = value.filter((x) => !prevRoomTags.includes(x))[0]
				.title;
		}
		handleTag(changedTag);

		setPrevRoomTags(value);
	};

	const handleChangeForFilterDesign = (event, value) => {
		setfilterDesignValues(value);

		let changedTag = "";
		if (value.length < prevDesignTags.length) {
			changedTag = prevDesignTags.filter((x) => !value.includes(x))[0]
				.title;
		} else {
			changedTag = value.filter((x) => !prevDesignTags.includes(x))[0]
				.title;
		}
		handleTag(changedTag);
		setPrevDesignTags(value);
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

	const roomTags = [
		{ id: 0, title: "Living Room" },
		{ id: 1, title: "Kitchen" },
		{ id: 2, title: "Balcony" },
		{ id: 3, title: "Bedroom" },
		{ id: 4, title: "Study Room" },
		{ id: 5, title: "Service Yard" },
	];

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

	const clearAllFilters = () => {
		resetDisplay();
		setfilterRoomValues([]);
		setfilterDesignValues([]);
		setPrevRoomTags([]);
		setPrevDesignTags([]);
	};

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
				{filterRoomValues.length + filterDesignValues.length > 0 && (
					<span>
						&nbsp;(
						{filterRoomValues.length + filterDesignValues.length})
					</span>
				)}
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
						<Typography
							variant="subtitle1"
							gutterBottom
							component="div"
						>
							Room type
						</Typography>
						<Autocomplete
							value={filterRoomValues}
							multiple
							limitTags={2}
							id="room-type"
							options={roomTags}
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
							onChange={handleChangeForFilterRoom}
							sx={{ width: "500px" }}
						/>
					</Box>
					<Box sx={{ mt: 3 }}>
						<Typography
							variant="subtitle1"
							gutterBottom
							component="div"
						>
							Interior design style
						</Typography>
						<Autocomplete
							value={filterDesignValues}
							multiple
							limitTags={2}
							id="design-type"
							options={designTags}
							getOptionLabel={(option) => option.title}
							defaultValue={[]}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Filter by interior design style"
									placeholder="Search design style"
								/>
							)}
							isOptionEqualToValue={(option, value) =>
								option.id === value.id
							}
							onChange={handleChangeForFilterDesign}
							sx={{ width: "500px" }}
						/>
					</Box>
				</Box>
			</Popover>
		</>
	);
};

export default FilterButton;
