import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const FilterButton = () => {
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
				<Box sx={{ display: "flex", pt: 2, px: 2 }}>
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">
							Categories
						</FormLabel>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="all"
							name="radio-buttons-group"
						>
							<FormControlLabel
								value="all"
								control={<Radio />}
								label="All"
							/>
							<FormControlLabel
								value="option1"
								control={<Radio />}
								label="Option 1"
							/>
							<FormControlLabel
								value="option2"
								control={<Radio />}
								label="Option 2"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
			</Popover>
		</>
	);
};

export default FilterButton;
