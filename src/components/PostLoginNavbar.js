import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Divider, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartButton from "../pages/Cart/CartButton";
import ChatButton from "../pages/Chat/ChatButton";
import NotificationButton from "../pages/Notifications/NotificationButton";
import { getCart } from "../services/Cart";
import { useStores } from "../stores/RootStore";
import ControlledSwitches from "./SwitchNav";
import mf_fulllogo_white from "../assets/images/mf_fulllogo_white.svg";

// const pageLinks = [
// 	{ text: "Seller Center", link: "/sellercenter" },
// 	{ text: "Marketplace", link: "/marketplace" },
// 	{ text: "Ideas", link: "/ideas" },
// ];

const AdminPageLinks = [{ text: "Admin Management", link: "/admin" }];

const sellerSettings = [
  { text: "Profile", link: "/profile" },
  { text: "Cart", link: "/cart" },
  { text: "Orders", link: "/profile/orders" },
  { text: "Liked Listing", link: "/profile/likedListing" },
  { text: "Seller Center", link: "/sellercenter" },
];

const normalSettings = [
  { text: "Profile", link: "/profile" },
  { text: "Cart", link: "/cart" },
  { text: "Orders", link: "/profile/orders" },
  { text: "Liked Listing", link: "/profile/likedListing" },
];

const PostLoginNavBar = ({ checked, setChecked, handleChange }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { userStore } = useStores();
  const profilePic = userStore.profilePic;

  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log("postlogin bar rerender");
    updateCart();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const setLogout = (e) => {
    userStore.setIsLoggedOut();
    navigate("/marketplace");
  };

  const updateCart = () => {
    const fetchCartData = async () => {
      // console.log("userId" + userStore.id)
      const response = await getCart(userStore.id);
      const result = await response.data;
      setCartCount(result.length);
    };

    fetchCartData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                src={mf_fulllogo_white}
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
              <Stack direction="row" spacing={2}>
                {/* <Tooltip title="Open notification">
                <>
                  <NotificationsPopover />
                </>
              </Tooltip> */}
                <NotificationButton />
                <ChatButton />
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {profilePic !== null ? (
                      <>
                        <Avatar
                          alt="Remy Sharp"
                          src={`/api/image/${profilePic}`}
                        />
                      </>
                    ) : (
                      <>
                        <Avatar alt="Remy Sharp" />
                      </>
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
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
                {!userStore.isSeller
                  ? normalSettings.map((setting) => (
                      <Link key={setting.link} to={setting.link}>
                        <MenuItem
                          key={setting.link}
                          onClick={handleCloseUserMenu}
                        >
                          {setting.text === "Profile" && (
                            <Tooltip title="Profile" placement="right">
                              <AccountCircleOutlinedIcon
                                sx={{ color: "common.black" }}
                              />
                            </Tooltip>
                          )}
                          {setting.text === "Cart" && (
                            <>
                              <CartButton cartCount={cartCount} />
                            </>
                          )}
                          {setting.text === "Orders" && (
                            <Tooltip title="Orders" placement="right">
                              <InventoryIcon sx={{ color: "common.black" }} />
                            </Tooltip>
                          )}
                          {setting.text === "Liked Listing" && (
                            <Tooltip title="Liked Listing" placement="right">
                              <FavoriteBorderIcon
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
                    ))
                  : sellerSettings.map((setting) => (
                      <Link key={setting.link} to={setting.link}>
                        <MenuItem
                          key={setting.link}
                          onClick={handleCloseUserMenu}
                        >
                          {setting.text === "Profile" && (
                            <Tooltip title="Profile" placement="right">
                              <AccountCircleOutlinedIcon
                                sx={{ color: "common.black" }}
                              />
                            </Tooltip>
                          )}
                          {setting.text === "Cart" && (
                            <>
                              <CartButton cartCount={cartCount} />
                            </>
                          )}
                          {setting.text === "Orders" && (
                            <Tooltip title="Orders" placement="right">
                              <InventoryIcon sx={{ color: "common.black" }} />
                            </Tooltip>
                          )}
                          {setting.text === "Liked Listing" && (
                            <Tooltip title="Liked Listing" placement="right">
                              <FavoriteBorderIcon
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
