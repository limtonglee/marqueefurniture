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
// Overview page components
import Header from "./Header";
import Moodboard from "./Moodboard/Moodboard";


function Profile() {
  return (
    <Container maxWidth="xl">
      <Header />
      <Button mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
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
      </Button>
      <Button mb={3}>
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
              <Grid item xs={12} md={6} xl={3}>
              </Grid>
            </Grid>
          </Button>
        </Card>
      </Button>
    </Container>
  );
}

export default Profile;