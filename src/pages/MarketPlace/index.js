import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const MarketPlace = () => {
  return (
    <Container maxWidth="xl">
      <Outlet/>
    </Container>
  );
};

export default MarketPlace;
