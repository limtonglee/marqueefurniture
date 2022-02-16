import React from "react";
import Login from "./pages/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import MarketPlace from "./pages/MarketPlace";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { itemDetails } from "./pages/MarketPlace/itemDetails";
import { Listings } from "./pages/MarketPlace/Listings";

const PreLogin = () => {
  return (
    <>
      <NavBar />
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<itemDetails />} />
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
