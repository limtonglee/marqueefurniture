import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { Avatar } from "@mui/material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ControlledSwitches from "./SwitchNav";
import { useStores } from "../stores/RootStore";

//const pages = ["Seller Center", "MarketPlace", "Social Media", "Login"];
//const links = ["sellercenter", "marketplace", "socialmedia", "login"];

const pageLinks = [
	{ text: "Market Place", link: "/marketplace" },
	{ text: "Seller Center", link: "/sellercenter" },
	{ text: "Ideas", link: "/ideas" },
	{ text: "Moodboard", link: "/moodboard/elon/0" },
	{ text: "Login", link: "/login" },
];

const NavBar = ({ checked, setChecked, handleChange }) => {
	const { switchStore } = useStores();

	return (
		<>
			<AppBar position="fixed" sx={appbarStyle}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Link
							key={"mf"}
							to={"/"}
							style={{ textDecoration: "none", color: "white" }}
							onClick={() => setChecked(false)}
						>
							<Avatar
								src="static/mf_fulllogo_white.svg"
								sx={{ width: 100, height: 100 }}
							/>
						</Link>

						<Box
							sx={{
								flexGrow: 1,
							}}
						>
							<ControlledSwitches
								checked={checked}
								handleChange={handleChange}
							/>
						</Box>
						<Link
							key={"mf"}
							to={"/login"}
							style={{ textDecoration: "none", color: "white" }}
						>
							<Typography
								variant="h7"
								noWrap
								component="div"
								sx={{ mr: 2 }}
							>
								Login
							</Typography>
						</Link>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
export default NavBar;

const appbarStyle = {
	opacity: 1,
};
