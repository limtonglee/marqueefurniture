import { Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MarketPlace = ({ setChecked }) => {
  useEffect(() => {
    setChecked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  );
};

export default MarketPlace;
