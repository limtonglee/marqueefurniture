import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const NavBar = () => {
  return (
    <>
      <Container>
        <Link to="/sellercenter"> Seller Center </Link>
        <Link to="/marketplace"> MarketPlace </Link>
        <Link to="/socialmedia"> Social Media </Link>
        <Link to="/login"> Login </Link>
      </Container>
    </>
  );
};

export default NavBar;