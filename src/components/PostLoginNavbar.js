import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Divider, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jack from "../assets/images/jack.jpg";
import { useStores } from "../stores/RootStore";
import NotificationsPopover from "./NotificationsPopover";
import ControlledSwitches from "./SwitchNav";

// const pageLinks = [
// 	{ text: "Seller Center", link: "/sellercenter" },
// 	{ text: "Marketplace", link: "/marketplace" },
// 	{ text: "Ideas", link: "/ideas" },
// ];

const AdminPageLinks = [{ text: "Admin Management", link: "/admin" }];

const settings = [
  { text: "Profile", link: "/profile" },
  { text: "Moodboards", link: "/moodboard/elon/0" },
  { text: "Cart", link: "/cart" },
  { text: "Chat", link: "/chat" },
  { text: "Seller Center", link: "/sellercenter" },
];

const PostLoginNavBar = ({ checked, setChecked, handleChange }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { userStore } = useStores();

  const { cartStore } = useStores();

  const setLogout = (e) => {
    userStore.setIsLoggedOut();
    navigate("/marketplace");
  };

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
                sx={{ width: 80, height: 80 }}
              />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              {!userStore.isAdmin && (
                <Grid item xs={4}>
                  <ControlledSwitches
                    checked={checked}
                    handleChange={handleChange}
                  />
                </Grid>
              )}
              {!!userStore.isAdmin && (
                <Grid container spacing={2}>
                  <Grid item xs={4} sx={{ mt: 2 }}>
                    <ControlledSwitches
                      checked={checked}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {AdminPageLinks.map((page) => (
                      <Link
                        key={page.link}
                        to={page.link}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          key={page.link}
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
                  </Grid>
                </Grid>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open notification">
                <>
                  <NotificationsPopover />
                </>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={jack} />
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
                      {setting.text === "Moodboards" && (
                        <Tooltip title="Moodboards" placement="right">
                          <DashboardIcon
                            sx={{
                              color: "common.black",
                            }}
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
                          <StorefrontIcon sx={{ color: "common.black" }} />
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
  opacity: 1,
};
