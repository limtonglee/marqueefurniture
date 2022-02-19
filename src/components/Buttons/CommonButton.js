import React from "react";
import Button from "@mui/material/Button";

const CommonButton = ({
	children,
	color,
	disabled,
	size,
	sx,
	variant,
	startIcon,
}) => {
	return (
		<Button
			color={color}
			disabled={disabled}
			size={size}
			variant={variant}
			sx={sx}
			startIcon={startIcon}
		>
			{children}
		</Button>
	);
};

export default CommonButton;
