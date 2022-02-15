import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const NavBar = () => {
  return (
    <>
      <Container>
        <Link to="/"> MarketPlace </Link>
        <div>Testing on vscode</div>
        <Link to="/Login"> Login </Link>
      </Container>
    </>
  );
};

export default NavBar;