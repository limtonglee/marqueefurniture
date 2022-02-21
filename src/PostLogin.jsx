import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginNavBar from "./components/PostLoginNavbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import Profile from "./pages/Profile";
import { MoodboardDetails } from "./pages/Profile/Moodboard/MoodboardDetails";
import Profiles from "./pages/Profiles";
import SellerCenter from "./pages/SellerCenter";
import Cart from "./pages/Cart/CartList";
import Ideas from "./pages/SocialMedia/Ideas";


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
        <Route path="/sellercenter" element={<SellerCenter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </>
  );
};

export default PostLogin;
