import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginNavBar from "./components/PostLoginNavbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import Profile from "./pages/Profile";
import SellerCenter from "./pages/SellerCenter";
import Ideas from "./pages/SocialMedia/Ideas";
import Post from "./pages/SocialMedia/Posts/Post";


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
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sellercenter" element={<SellerCenter />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};


export default PostLogin;

