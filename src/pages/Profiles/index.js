import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Profiles = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" fontWeight="medium" color={"primary.main"}>
        Profile
      </Typography>
      <Outlet />
    </Container>
  );
};

export default Profiles;
