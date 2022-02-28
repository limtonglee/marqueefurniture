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

// below to remove later
import Users from "./pages/Users";
import { UserDetails } from "./pages/Users/UserDetails";
import { UserIndex } from "./pages/Users/UserIndex";



const PreLogin = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" />} />
        <Route path="/socialmedia" element={<Login />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/new-idea" element={<CreateNewPost />} />
        <Route path="/ideas/:postId" element={<Post />} />
        <Route path="/moodboard/:username/:moodboardId" element={<ViewMoodboard />} />
        <Route path="/marketplace" element={<MarketPlace />}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/sellercenter" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        
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
