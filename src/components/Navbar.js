import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
  { text: "Moodboard", link: "/moodboard/alicetan/0" },
  { text: "Login", link: "/login" },
];

const NavBar = () => {
  const { switchStore } = useStores();
  const [checked, setChecked] = React.useState(switchStore.checked);

  let navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
    switchStore.setCheck(event.target.checked);
    if (event.target.checked === false) {
      navigate("/marketplace");
    }
    if (event.target.checked === true) {
      navigate("/ideas");
    }
  };

  const setSwitch = () => {
    setChecked(false);
    switchStore.setCheck(false);
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
              onClick={setSwitch}
            >
              <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
                MF
              </Typography>
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
              <Typography variant="h7" noWrap component="div" sx={{ mr: 2 }}>
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
