import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NewTag from "../Tags/NewTag";

const FilterButton = ({ handleTag }) => {
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

	const tags = ["Living Room", "Cosy", "Wood", "Kitchen"];

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
				<Box sx={{ py: 2, px: 2 }}>
					<Box
						sx={{
							width: 350,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography variant="h6" gutterBottom component="div">
							Filter by more categories
						</Typography>
						<Button size="small">Clear All</Button>
					</Box>
					<Typography variant="subtitle1">Room Tags</Typography>
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
					</Box>
				</Box>
			</Popover>
		</>
	);
};

export default FilterButton;
