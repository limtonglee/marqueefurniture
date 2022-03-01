import React, { useEffect } from "react";
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
import Badge from "@mui/material/Badge";
import { useStores } from "../stores/RootStore";
import { Divider } from "@mui/material";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import palette from "../theme/palette";

import ControlledSwitches from "./SwitchNav";

const pageLinks = [
  { text: "Seller Center", link: "/sellercenter" },
  { text: "Marketplace", link: "/marketplace" },
  { text: "Ideas", link: "/ideas" },
];

const AdminPageLinks = [
  { text: "Admin", link: "/admin" },
  { text: "Marketplace", link: "/marketplace" },
  { text: "Ideas", link: "/ideas" },
];

const settings = [
  { text: "Profile", link: "/profile" },
  { text: "Cart", link: "/cart" },
  { text: "Chat", link: "/chat" },
  { text: "Seller Center", link: "/sellercenter" },
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

  const { cartStore } = useStores();

  let navigate = useNavigate();

  const setLogout = (e) => {
    userStore.setIsLoggedOut();
    navigate("/marketplace");
  };

  return (
    <>
      <AppBar position="fixed" sx={appbarStyle}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Link
              key={"mf"}
              to={"/"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                MF
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <ControlledSwitches />

              {!!userStore.isAdmin &&
                AdminPageLinks.map((page) => (
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
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <Link key={setting.link} to={setting.link}>
                    <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                      {setting.text === "Profile" && (
                        <Tooltip title="Profile" placement="right">
                          <AccountCircleOutlinedIcon
                            sx={{ color: "common.black" }}
                          />
                        </Tooltip>
                      )}
                      {setting.text === "Cart" && (
                        <>
                          <Tooltip title="Cart" placement="right">
                            <Badge
                              color="secondary"
                              badgeContent={cartStore.items.length}
                            >
                              <ShoppingCartCheckoutIcon
                                sx={{ color: "common.black" }}
                              />
                            </Badge>
                          </Tooltip>
                        </>
                      )}
                      {setting.text === "Chat" && (
                        <Tooltip title="Chat" placement="right">
                          <ChatBubbleOutlineIcon
                            sx={{ color: "common.black" }}
                          />
                        </Tooltip>
                      )}
                      {setting.text === "Seller Center" && (
                        <Tooltip title="Seller Center" placement="right">
                          <StorefrontIcon
                            sx={{ color: "common.black" }}
                          />
                        </Tooltip>
                      )}
                    </MenuItem>
                  </Link>
                ))}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={setLogout}>
                  <Tooltip title="Logout" placement="right">
                    <LogoutOutlinedIcon sx={{ color: "common.black" }} />
                  </Tooltip>
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

const appbarStyle = {
  opacity: 1
};
