import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginNavBar from "./components/PostLoginNavbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import Profile from "./pages/Profile";
import SellerCenter from "./pages/SellerCenter";
import { MoodboardDetails } from "./pages/Profile/Moodboard/MoodboardDetails";
import Moodboard from "./pages/Profile/Moodboard/Moodboard";

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
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/profile" element={<Profile />}>
          <Route path="/moodboard" element={<Moodboard />} />
          <Route path="/moodboard/:moodboardId" element={<MoodboardDetails />} />
        </Route> */}
      </Routes>
    </>
  );
};


export default PostLogin;

