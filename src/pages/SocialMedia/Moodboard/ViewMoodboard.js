import React, { useState } from "react";
import ReusableMasonry from "./ReusableMasonry";
import { user } from "../../../data/currentUserData";

const ViewMoodboard = () => {
	const [moodboards, setMoodboards] = useState(user.moodboards);
	const [currentMoodboardId, setCurrentMoodboardId] = useState(
		user.moodboards[0].id
	);
	const [currentMoodboard, setCurrentMoodboard] = useState(
		moodboards[currentMoodboardId]
	);

	return (
		<>
			<ReusableMasonry postData={currentMoodboard} />
		</>
	);
};

export default ViewMoodboard;
