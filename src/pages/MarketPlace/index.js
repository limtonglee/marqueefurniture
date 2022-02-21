import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const MarketPlace = () => {
  return (
    <Container maxWidth="xl">
      <h1>Marketplace</h1>
      <Outlet/>
    </Container>
  );
};

export default MarketPlace;
