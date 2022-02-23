import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import SellerCenter from "./pages/SellerCenter";
import { Orders } from "./pages/SellerCenter/Orders";
import { MyListings } from "./pages/SellerCenter/Listings/MyListings";
import { AddNewListing } from "./pages/SellerCenter/Listings/AddNewListing";
import { Voucher } from "./pages/SellerCenter/Voucher";
import { ShopProfile } from "./pages/SellerCenter/Shop/Profile";
import { ShopRating } from "./pages/SellerCenter/Shop/Rating";
import { ShopCategories } from "./pages/SellerCenter/Shop/Categories";
import { Income } from "./pages/SellerCenter/Finance/Income";
import { Balance } from "./pages/SellerCenter/Finance/Balance";
import SignUp from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";

// below to remove later
import Users from "./pages/Users";
import {UserDetails} from "./pages/Users/UserDetails";
import { UserIndex } from "./pages/Users/UserIndex";
import StartSelling from "./pages/Profile/About/StartSelling";
import Profile from "./pages/Profile/";


const PreLogin = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
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
        <Route path="/socialmedia" element={<Login />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        

      {/* below to remove later */}
      <Route path="/profile/sell" element={<StartSelling />} />
      <Route path="/profile/" element={<Profile />} />
      <Route path="users" element={<Users />}>
           <Route path="" element={<UserIndex />} />
           <Route path=":userId" element={<UserDetails />} />
         </Route>



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
