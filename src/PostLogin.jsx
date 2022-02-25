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
import { Balance } from "./pages/SellerCenter/Finance/Balance";
import { Income } from "./pages/SellerCenter/Finance/Income";
import { AddNewListing } from "./pages/SellerCenter/Listings/AddNewListing";
import { MyListings } from "./pages/SellerCenter/Listings/MyListings";
import { Orders } from "./pages/SellerCenter/Orders";
import { ShopCategories } from "./pages/SellerCenter/Shop/Categories";
import { ShopProfile } from "./pages/SellerCenter/Shop/Profile";
import { ShopRating } from "./pages/SellerCenter/Shop/Rating";
import { Voucher } from "./pages/SellerCenter/Voucher";
import Ideas from "./pages/SocialMedia/Ideas";
import Post from "./pages/SocialMedia/Posts/Post";
import EditProfile from "./pages/Profile/About/EditProfile";
import StartSelling from "./pages/Profile/About/StartSelling";
import Chat from "./pages/Chat/ChatModule";

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
        <Route path="/Chat" element={<Chat/>} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sellercenter" element={<SellerCenter />}>
          <Route path="" element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="listings/mylistings" element={<MyListings />} />
          <Route path="listings/addNewListing" element={<AddNewListing />} />
          <Route path="voucher" element={<Voucher />} />
          <Route path="shop" element={<ShopProfile />} />
          <Route path="shop/profile" element={<ShopProfile />} />
          <Route path="shop/rating" element={<ShopRating />} />
          <Route path="shop/categories" element={<ShopCategories />} />
          <Route path="finance" element={<Income />} />
          <Route path="finance/income" element={<Income />} />
          <Route path="finance/balance" element={<Balance />} />
        </Route>
        <Route path="/profile" element={<Profiles />}>
          <Route path="" element={<Profile />} />
          <Route path=":moodboardId" element={<MoodboardDetails />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="sell" element={<StartSelling />} />
        </Route>
      </Routes>
    </>
  );
};

export default PostLogin;
