import React, { useState } from "react";
import Tag from "./Tag";

const NewTag = ({ tag, handleTag }) => {
	const defaultVars = {
		"&.MuiChip-root": {
			borderRadius: 1.5,
		},
		bordeColor: "#2E6B75",
		color: "#2E6B75",

		margin: 0.5,
	};

	const selectedVars = {
		"&.MuiChip-root": {
			borderRadius: 1.5,
		},
		backgroundColor: "#2E6B75",
		color: "#FFFFFF",
		margin: 0.5,
		"&:hover": {
			backgroundColor: "#2E6B75 !important",
			color: "#FFFFFF !important",
		},
	};

	const [vars, setVars] = useState(defaultVars);
	// const [selected, setSelected] = useState(tag.selected);

	const handleClick = (e) => {
		console.log("initial selected", tag.selected);
		setVars(tag.selected ? selectedVars : defaultVars);
		// setSelected(!selected);
		tag.toggleSelected();
		console.log("after calling toggle method", tag.selected);
		handleTag(tag.tagName);
	};

	return (
		<>
			<Tag
				label={tag.tagName}
				size="large"
				variant="outlined"
				sx={vars}
				handleClick={handleClick}
			></Tag>
		</>
	);
};

export default NewTag;
