import React from "react";
import Chip from "@mui/material/Chip";

const Tag = ({
	handleClick,
	color,
	disabled,
	size,
	sx,
	variant,
	clickable,
	label,
}) => {
	return (
		<Chip
			color={color}
			disabled={disabled}
			size={size}
			variant={variant}
			sx={sx}
			clickable={clickable}
			onClick={handleClick}
			label={label}
		></Chip>
	);
};

export default Tag;
