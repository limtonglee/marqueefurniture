import React from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useStores } from "../stores/RootStore";

//const pages = ["Seller Center", "MarketPlace", "Social Media", "Login"];
//const links = ["sellercenter", "marketplace", "socialmedia", "login"];

const pageLinks = [
	{ text: "Seller Center", link: "/sellercenter" },
	{ text: "Marketplace", link: "/marketplace" },
	{ text: "Ideas", link: "/ideas" },
];

const settings = [
  { text: "Profile", link: "/profile" },
  { text: "Cart", link: "/cart" },
  { text: "Account", link: "/account" },
  { text: "Dashboard", link: "/dashboard" },
];

const PostLoginNavBar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const { userStore } = useStores();

	let navigate = useNavigate();

	const setLogout = (e) => {
		userStore.setIsLoggedOut();
		navigate("/marketplace");
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
										key={page.link}
										onClick={handleCloseNavMenu}
									>
										<Link
											key={page.link}
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
									key={page.link}
									to={page.link}
									style={{ textDecoration: "none" }}
								>
									<Button
										key={page.link}
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

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt="Remy Sharp"
										src="/static/images/avatar/2.jpg"
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<Link
										key={setting.link}
										to={setting.link}
										style={{ textDecoration: "none" }}
									>
										<MenuItem
											key={setting.link}
											onClick={handleCloseUserMenu}
										>
											<Typography textAlign="center">
												{setting.text}
											</Typography>
										</MenuItem>
									</Link>
								))}
								<MenuItem onClick={setLogout}>
									<Typography textAlign="center">
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
export default PostLoginNavBar;
