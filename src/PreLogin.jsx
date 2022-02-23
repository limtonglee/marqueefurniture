import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import SignUp from "./pages/Signup";
import Ideas from "./pages/SocialMedia/Ideas";
import Post from "./pages/SocialMedia/Posts/Post";


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
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:id" element={<Post />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/sellercenter" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />

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
