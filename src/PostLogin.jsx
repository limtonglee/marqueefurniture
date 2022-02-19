import React from "react";
import Login from "./pages/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import MarketPlace from "./pages/MarketPlace";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import PostLoginNavBar from "./components/PostLoginNavbar";
import SellerCenter from "./pages/SellerCenter";



const PostLogin = () => {
  return (
    <>
      <PostLoginNavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sellercenter" element={<SellerCenter />} />

      </Routes>
    </>
  );
};


export default PostLogin;
