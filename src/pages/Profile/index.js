// @mui icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { moodboardData } from "../../data/moodboardData";
import { useStores } from "../../stores/RootStore";
import ProfileInfoCard from "./About/ProfileInfoCard";
// Overview page components
import Header from "./Header";
import Moodboard from "./Moodboard/Moodboard";
import AddIcon from "@mui/icons-material/Add";
import MoodboardViewInProfile from "./Moodboard/MoodboardViewInProfile";

function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const { userStore } = useStores();

  //username in header component does not update
  const [userName, setUserName] = useState(userStore.name);
  const [shopName, setShopName] = useState(userStore.shop);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Header name={userName} shopName={shopName} />
      <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
        <Box sx={{ width: "auto", bgcolor: "background" }}>
          <Tabs
            value={tabValue}
            onChange={handleSetTabValue}
            centered
            variant="fullWidth"
            sx={{ background: "white" }}
          >
            <Tab label="Moodboard" icon={<AccountBoxIcon />} />
            <Tab label="Posts" icon={<MessageIcon />} />
            <Tab label="About" icon={<SettingsIcon />} />
          </Tabs>
        </Box>
      </Grid>
      {tabValue === 2 ? (
        <Grid>
          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="username"
              description="Bio"
              website="Website"
              userName={userName}
              setUserName={setUserName}
              setShopName={setShopName}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {tabValue === 0 ? (
        <MoodboardViewInProfile />
      ) : (
        // <Grid>
        //   <Button p={2}>
        //     <Grid container spacing={3}>
        //       {moodboardData.map((moodboard) => (
        //         <Grid item xs={12} md={6} xl={3}>
        //           <Moodboard
        //             image={moodboard.img}
        //             label={moodboard.label}
        //             title={moodboard.title}
        //             description={moodboard.description}
        //             action={{
        //               type: "internal",
        //               route: `/profile/${moodboard.id}`,
        //               color: "info",
        //               label: "view board",
        //             }}
        //           />
        //         </Grid>
        //       ))}
        //     </Grid>
        //   </Button>
        // </Grid>
        <></>
      )}
    </Container>
  );
}

// Typechecking props for the Profile
Profile.propTypes = {
  // title: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
};

export default Profile;
