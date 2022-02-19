import React from "react";
import Tag from "./Tag";

const CurrentTag = ({ label }) => {
	const tagStyles = {
		"&.MuiChip-root": {
			borderRadius: 1.5,
		},
		backgroundColor: "#2E6B75",
		color: "#FFFFFF",
	};
	return (
		<Tag label={label} size="large" variant="filled" sx={tagStyles}></Tag>
	);
};

export default CurrentTag;
