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
        <Route path="/socialmedia" element={<Login />} />
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
