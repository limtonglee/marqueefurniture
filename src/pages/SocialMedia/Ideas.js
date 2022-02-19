import React from "react";
import CurrentTag from "../../components/Tags/CurrentTag";
import OtherTag from "../../components/Tags/OtherTag";
import Stack from "@mui/material/Stack";
import SortButton from "../../components/SortButton";
import FilterButton from "../../components/Buttons/FilterButton";
import FeedGrid from "./FeedGrid/FeedGrid";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";

const Ideas = () => {
	const tags = [
		{
			id: 0,
			label: "Living Room",
		},
		{
			id: 1,
			label: "Cosy",
		},
		{
			id: 2,
			label: "Wood",
		},
		{
			id: 3,
			label: "Kitchen",
		},
	];

	const pageStyles = {
		tags: {
			p: 2,
		},
		sortFilter: {
			p: 2,
			display: "flex",
			justifyContent: "space-between",
		},
		masonry: {
			p: 2,
		},
	};

	return (
		<>
			<Container sx={{ pt: 2 }}>
				<Box sx={pageStyles.tags}>
					<Stack direction="row" spacing={1}>
						<CurrentTag label={tags[0].label}></CurrentTag>
						{tags.map((tag) => {
							return <OtherTag label={tag.label}></OtherTag>;
						})}
					</Stack>
				</Box>
				<Box sx={pageStyles.sortFilter}>
					<SortButton />
					<FilterButton />
				</Box>
				<Box sx={pageStyles.masonry}>
					<FeedGrid />
				</Box>
			</Container>
		</>
	);
};

export default Ideas;
