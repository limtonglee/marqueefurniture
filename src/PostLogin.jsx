import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginNavBar from "./components/PostLoginNavbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import Profile from "./pages/Profile";
import LikedListing from "./pages/Profile/LikedListing/LikedListing";
import { MoodboardDetails } from "./pages/Profile/Moodboard/MoodboardDetails";
import Profiles from "./pages/Profiles";
import SellerCenter from "./pages/SellerCenter";
import Cart from "./pages/Cart/CartList";
import { Income } from "./pages/SellerCenter/Finance/Income";
import { AddNewListing } from "./pages/SellerCenter/Listings/AddNewListing";
import { MyListings } from "./pages/SellerCenter/Listings/MyListings";
import { Orders } from "./pages/SellerCenter/Orders/Orders";
import { ShopCategories } from "./pages/SellerCenter/Shop/Categories";
import { ShopCategoryDetails } from "./pages/SellerCenter/Shop/CategoryDetails";
import { ShopProfile } from "./pages/SellerCenter/Shop/Profile";
import { ShopRating } from "./pages/SellerCenter/Shop/Rating";
import { Voucher } from "./pages/SellerCenter/Voucher/Voucher";
import Ideas from "./pages/SocialMedia/Ideas";
import Post from "./pages/SocialMedia/Posts/Post";
import CreateNewPost from "./pages/SocialMedia/Posts/CreateNewPost";
import ViewMoodboard from "./pages/SocialMedia/Moodboard/ViewMoodboard";
// import Chat from "./pages/Chat/ChatModule";
import Messenger from "./pages/Chat/Messenger";
import RequestConsultation from "./pages/Design/RequestConsultation";
import DesignOrderProgress from "./pages/Design/DesignOrderProgress";
import Design from "./pages/Design/Design";
import ReviewDesign from "./pages/Design/ReviewDesign";

import { Box } from "@mui/material";
import SellerProfile from "./pages/SellerProfile/SellerProfile";
import StripeContainer from "./pages/Checkout/StripeContainer";
import ProfileOrders from "./pages/Profile/Orders";

const PostLogin = ({checked, setChecked, handleChange}) => {
  return (
    <>
      <PostLoginNavBar position="fixed" checked={checked} setChecked={setChecked} handleChange={handleChange}/>
      <Box sx={{ mt: 15 }}></Box>
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/marketplace" element={<MarketPlace setChecked={setChecked} />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        {/* <Route path="/Chat" element={<Chat />} /> */}
        <Route path="/SellerProfile" element={<SellerProfile/>} />
        <Route path="/Chat" element={<Messenger/>} />
        <Route path="/designConsultation" element={<RequestConsultation/>} />
        <Route path="/designOrderProgress" element={<DesignOrderProgress/>} />
        <Route path="/designOrder/design" element={<Design/>} />
        <Route path="/designOrder/design/review" element={<ReviewDesign/>} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/new-idea" element={<CreateNewPost />} />
        <Route path="/ideas/:postId" element={<Post />} />
        <Route path="/moodboard/:username/:moodboardId" element={<ViewMoodboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<StripeContainer />} />
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
          <Route path="shop/categories/:categoryId" element={<ShopCategoryDetails />} />
          <Route path="finance" element={<Income />} />
          <Route path="finance/income" element={<Income />} />
        </Route>
        <Route path="/profile" element={<Profiles />}>
          <Route path="" element={<Profile />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route path=":moodboardId" element={<MoodboardDetails />} />
          <Route path="likedListing" element={<LikedListing />} />
        </Route>
      </Routes>
    </>
  );
};

export default PostLogin;
