// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
// Soft UI Dashboard React components
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import spacejoy from "../../assets/images/spacejoy.jpg";
import ProfileInfoCard from "./About/ProfileInfoCard";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import breakpoints from "../../theme/breakpoints";

// Overview page components
import Header from "./Header";
import Moodboard from "./Moodboard/Moodboard";

import { useEffect, useState } from "react";

import { moodboardData } from "../../data/moodboardData";

import Box from "@mui/material/Box";

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
            centered
           variant="fullWidth"
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
              title="bio"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                // username: "Alec M. Thompson",
                // contact: "(44) 123 1234 123",
                // email: "alecthompson@mail.com",
                // location: "USA",
                link: "https://www.facebook.com/",
                
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
              action={{ 
                route: "/profile/edit", tooltip: "Edit Profile",
              }}
            />
             {/* <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/profile/sell"
            >
              Start Selling
            </Button>

        </Box> */}
          </Grid>
        </Grid>
        
      ) : (
        <></>
      )}
      {tabValue === 0 ? (
        <Grid>
          <Card>
            <Button pt={2} px={2}>
              <Button mb={0.5}>
                <Typography variant="h6" fontWeight="medium">
                  Mood Board
                </Typography>
              </Button>
            </Button>
            <Button p={2}>
              <Grid container spacing={3}>
                {moodboardData.map((moodboard) => 
              <Grid item xs={12} md={6} xl={3}>
                  <Moodboard
                    image={moodboard.img}
                    label={moodboard.label}
                    title={moodboard.title}
                    description={moodboard.description}
                    action={{
                      type: "internal",
                      route: `/profile/${moodboard.id}`,
                      color: "info",
                      label: "view board",
                    }}
                  />
                </Grid>
                )}


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


