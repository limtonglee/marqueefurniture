// @mui icons
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useStores } from "../../stores/RootStore";
import ProfileInfoCard from "./About/ProfileInfoCard";
// Overview page components
import Header from "./Header";
import MoodboardViewInProfile from "./Moodboard/MoodboardViewInProfile";
import Divider from "@mui/material/Divider";

function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const { userStore } = useStores();

  const [profilePic, setProfilePic] = useState(userStore.profilePic);

  //username in header component does not update
  const [userName, setUserName] = useState(userStore.name);
  const [shopName, setShopName] = useState(userStore.shop);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Header name={userName} shopName={shopName} profilePic={profilePic} />
      <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
        <Box sx={{ width: "auto", bgcolor: "background" }}>
          <Tabs
            value={tabValue}
            onChange={handleSetTabValue}
            centered
            variant="fullWidth"
            sx={{ background: "white" }}
          >
            {/* <Tab label="Moodboard" icon={<AccountBoxIcon />} />
            <Tab label="Posts" icon={<MessageIcon />} />
            <Tab label="About" icon={<SettingsIcon />} /> */}
            <Tab label="Moodboard" />
            <Tab label="Posts" />
            <Tab label="About" />
          </Tabs>
          <Divider />
        </Box>
      </Grid>
      {tabValue === 2 ? (
        <Grid>
          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="username"
              description="Bio"
              website="Address"
              userName={userName}
              setUserName={setUserName}
              setShopName={setShopName}
              setProfilePic={setProfilePic}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {tabValue === 0 && <MoodboardViewInProfile />}
    </Container>
  );
}

// Typechecking props for the Profile
Profile.propTypes = {
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
};

export default Profile;
