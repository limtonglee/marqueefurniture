import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import MarketPlace from "./pages/MarketPlace";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import itemDetails from "./pages/MarketPlace/itemDetails"

const PreLogin = () => {
  return (
    <>
      <NavBar />
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<MarketPlace />} >
          <Route path=":itemDetails" element={<itemDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

// PreLogin.propTypes = {
//   location: PropTypes.shape({
//     state: PropTypes.shape,
//   }),
// };

export default PreLogin;
