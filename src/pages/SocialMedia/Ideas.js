import React from "react";
import CurrentTag from "../../components/Tags/CurrentTag";
import OtherTag from "../../components/Tags/OtherTag";
import Stack from "@mui/material/Stack";
import SortButton from "../../components/SortButton";
import FilterButton from "../../components/Buttons/FilterButton";

const Ideas = () => {
	return (
		<div>
			<h1>ideas</h1>
			<Stack direction="row" spacing={1}>
				<CurrentTag label="Living Room"></CurrentTag>
				<OtherTag label="Cosy"></OtherTag>
				<OtherTag label="Wood"></OtherTag>
				<OtherTag label="Kitchen"></OtherTag>
			</Stack>
			<SortButton />
			<FilterButton />
		</div>
	);
};

export default Ideas;
