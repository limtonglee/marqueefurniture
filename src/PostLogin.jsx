import React from "react";
import Login from "./pages/Login";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Container } from "@mui/material";
import MarketPlace from "./pages/MarketPlace";
import Ideas from "./pages/SocialMedia/Ideas";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import PostLoginNavBar from "./components/PostLoginNavbar";



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
        <Route path="/ideas" element={<Ideas />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};


export default PostLogin;

