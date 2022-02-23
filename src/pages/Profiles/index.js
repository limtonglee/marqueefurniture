import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Profiles = () => {
  return (
    <Container maxWidth="xl">
      <h1>Profile page</h1>
      <Outlet/>
    </Container>
  );
};

export default Profiles;
