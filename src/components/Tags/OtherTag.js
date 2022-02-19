import React from "react";
import Tag from "./Tag";

const OtherTag = ({ label }) => {
	const tagStyles = {
		"&.MuiChip-root": {
			borderRadius: 1.5,
		},
		bordeColor: "#2E6B75",
		color: "#2E6B75",
		"&:hover": {
			backgroundColor: "#2E6B75",
			color: "#FFFFFF",
		},
	};
	return (
		<Tag label={label} size="large" variant="outlined" sx={tagStyles}></Tag>
	);
};

export default OtherTag;
