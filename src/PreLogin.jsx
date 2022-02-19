import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import SignUp from "./pages/Signup";

const PreLogin = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/sellercenter" element={<Login />} />
        <Route path="/socialmedia" element={<Login />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
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
