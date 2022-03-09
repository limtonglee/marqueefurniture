import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Profiles = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default Profiles;
