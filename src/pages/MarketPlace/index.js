import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useStores } from "../../stores/RootStore";
import { useEffect } from "react";

const MarketPlace = ({ setChecked }) => {
  useEffect(() => {
    setChecked(false);
  }, []);

  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default MarketPlace;
