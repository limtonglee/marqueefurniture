import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PostCard = ({ img }) => {
	const postCardStyles = {
		cardActions: {
			position: "absolute",
			bottom: 0,
			right: 0,
		},
		checkboxes: {
			backgroundColor: "white",
			borderRadius: "50%",
			"&.MuiCheckbox-root:hover": {
				backgroundColor: "#F2F2F2",
				borderRadius: "50%",
			},
		},
	};
	return (
		<Card sx={{ width: 200, position: "relative" }}>
			<CardMedia
				component="img"
				width="100%"
				objectFit="scale-down"
				image={img}
				alt="green iguana"
			/>
			<CardActions sx={postCardStyles.cardActions}>
				<Checkbox
					{...label}
					icon={<PushPinOutlinedIcon fontSize="small" />}
					checkedIcon={<PushPinIcon fontSize="small" />}
					sx={postCardStyles.checkboxes}
				/>
				<Checkbox
					{...label}
					icon={<FavoriteBorder fontSize="small" />}
					checkedIcon={<Favorite fontSize="small" />}
					sx={postCardStyles.checkboxes}
				/>
			</CardActions>
		</Card>
	);
};

export default PostCard;
