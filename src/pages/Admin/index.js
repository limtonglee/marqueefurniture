import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import PostLoginNavBar from "../../components/PostLoginNavbar";
import Login from "../Login";
import MarketPlace from "../MarketPlace";
import { ItemDetails } from "../MarketPlace/ItemDetails";
import { Listings } from "../MarketPlace/Listings";
import Profile from "../Profile";
import { MoodboardDetails } from "../Profile/Moodboard/MoodboardDetails";
import Profiles from "../Profiles";
import Ideas from "../SocialMedia/Ideas";
import AdminHome from "./AdminHome";
import { Box } from "@mui/material";

const Admin = ({checked, setChecked, handleChange}) => {
  return (
    <Container maxWidth="xxl">
      <PostLoginNavBar checked={checked} setChecked = {setChecked} handleChange={handleChange}/>
      <Box sx={{ mt: 15 }}></Box>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/marketplace" element={<MarketPlace setChecked = {setChecked}/>}>
          <Route path="" element={<Listings />} />
          <Route path=":itemId" element={<ItemDetails />} />
        </Route>
        <Route path="/ideas" element={<Ideas />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profiles />}>
          <Route path="" element={<Profile />} />
          <Route path=":moodboardId" element={<MoodboardDetails />} />
        </Route>
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </Container>
  );
};

export default Admin;
