// @mui icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import TwitterIcon from "@mui/icons-material/Twitter";
//mui components
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import spacejoy from "../../assets/images/spacejoy.jpg";
import ProfileInfoCard from "./About/ProfileInfoCard";
// Overview page components
import Header from "./Header";
import Moodboard from "./Moodboard/Moodboard";


function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Header />
      <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
        <AppBar position="static">
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
        </AppBar>
      </Grid>
      {tabValue === 2 ? (
        <Grid>
          <Grid item xs={12} md={12} xl={12}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {tabValue === 0 ? (
        <Grid>
          <Card>
            <Button pt={2} px={2}>
                <Typography variant="h6" fontWeight="medium">
                  Mood Board
                </Typography>
            </Button>
            <Button p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <Moodboard
                    image={spacejoy}
                    label="board #1"
                    title="modern"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "internal",
                      route: "/profile/profile-overview",
                      color: "info",
                      label: "view board",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <Moodboard
                    image={spacejoy}
                    label="board #2"
                    title="scandinavian"
                    description="Music is something that every person has his or her own specific opinion about."
                    action={{
                      type: "internal",
                      route: "/profile/profile-overview",
                      color: "info",
                      label: "view board",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <Moodboard
                    image={spacejoy}
                    label="board #3"
                    title="minimalist"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "internal",
                      route: "/profile/profile-overview",
                      color: "info",
                      label: "view board",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}></Grid>
              </Grid>
            </Button>
          </Card>
        </Grid>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Profile;
