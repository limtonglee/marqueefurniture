import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import Login from "./pages/Login";
import MarketPlace from "./pages/MarketPlace";
import { ItemDetails } from "./pages/MarketPlace/ItemDetails";
import { Listings } from "./pages/MarketPlace/Listings";
import Profile from "./pages/Profile/";
import SignUp from "./pages/Signup";
import Ideas from "./pages/SocialMedia/Ideas";
import Post from "./pages/SocialMedia/Posts/Post";
import CreateNewPost from "./pages/SocialMedia/Posts/CreateNewPost";
import ViewMoodboard from "./pages/SocialMedia/Moodboard/ViewMoodboard";

import { Box } from "@mui/material";


const PreLogin = ({checked, setChecked, handleChange}) => {
  return (
    <>
      <NavBar checked={checked} handleChange={handleChange}/>
      <Box sx={{ mt: 15 }}></Box>
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/socialmedia" element={<Login />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/new-idea" element={<CreateNewPost />} />
        <Route path="/ideas/:postId" element={<Post />} />
        <Route path="/moodboard/:username/:moodboardId" element={<ViewMoodboard />} />
        <Route path="/marketplace" element={<MarketPlace setChecked={setChecked}/>}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/sellercenter" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        
      <Route path="/profile/" element={<Profile />} />
    



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
