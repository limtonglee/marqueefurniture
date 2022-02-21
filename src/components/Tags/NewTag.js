import React, { useState } from "react";
import Tag from "./Tag";

// let selected = false;

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
	const [selected, setSelected] = useState(false);

	const handleClick = (e) => {
		setVars(selected ? defaultVars : selectedVars);
		// selected = !selected;
		setSelected(!selected);
		handleTag(tag);
	};

	return (
		<>
			<Tag
				label={tag}
				size="large"
				variant="outlined"
				sx={vars}
				handleClick={handleClick}
			></Tag>
		</>
	);
};

export default NewTag;
