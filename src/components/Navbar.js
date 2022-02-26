import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

//const pages = ["Seller Center", "MarketPlace", "Social Media", "Login"];
//const links = ["sellercenter", "marketplace", "socialmedia", "login"];

const pageLinks = [
	{ text: "Market Place", link: "/marketplace" },
	{ text: "Seller Center", link: "/sellercenter" },
	{ text: "Ideas", link: "/ideas" },
	{ text: "Moodboard", link: "/view-moodboard" },
	{ text: "Login", link: "/login" },
];

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
						>
							MF
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pageLinks.map((page) => (
									<MenuItem
										key={page.text}
										onClick={handleCloseNavMenu}
									>
										<Link
											key={page.text}
											to={page.link}
											style={{ textDecoration: "none" }}
										>
											<Typography textAlign="center">
												{page.text}
											</Typography>
										</Link>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
							}}
						>
							MF
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
							}}
						>
							{pageLinks.map((page) => (
								<Link
									key={page.text}
									to={page.link}
									style={{ textDecoration: "none" }}
								>
									<Button
										key={page.text}
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: "white",
											display: "block",
										}}
									>
										{page.text}
									</Button>
								</Link>
							))}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
export default NavBar;
