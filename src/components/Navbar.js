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

import ControlledSwitches from "./SwitchNav";

//const pages = ["Seller Center", "MarketPlace", "Social Media", "Login"];
//const links = ["sellercenter", "marketplace", "socialmedia", "login"];

const pageLinks = [
  { text: "Market Place", link: "/marketplace" },
  { text: "Seller Center", link: "/sellercenter" },
  { text: "Ideas", link: "/ideas" },
  { text: "Moodboard", link: "/moodboard/alicetan/0" },
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
      <AppBar position="fixed" sx={appbarStyle}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link key={"mf"} to={"/"} style={{ textDecoration: "none" , color: "white"}}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                MF
              </Typography>
            </Link>
         
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
            <ControlledSwitches/>
            </Box>
			<Link key={"mf"} to={"/login"} style={{ textDecoration: "none" , color: "white"}}>
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
	opacity: 1
  };
