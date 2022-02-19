import React from "react";
import Button from "@mui/material/Button";
import CommonButton from "./CommonButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const FilterButton = () => {
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
		<CommonButton
			variant="outlined"
			startIcon={<FilterAltOutlinedIcon />}
			sx={filterButtonStyles}
		>
			Filter
		</CommonButton>
	);
};

export default FilterButton;
