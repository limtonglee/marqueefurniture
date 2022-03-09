import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import ControlledSwitches from "./SwitchNav";


const NavBar = ({ checked, setChecked, handleChange }) => {

	return (
		<>
			<AppBar position="fixed" sx={appbarStyle}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Link
							key={"mf-prelogin"}
							to={"/"}
							style={{ textDecoration: "none", color: "white" }}
							onClick={() => setChecked(false)}
						>
							<Avatar
								src="static/mf_fulllogo_white.svg"
								sx={{ width: 80, height: 80 }}
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
							key={"mf-login"}
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
