import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Customers from "../customer";

const AdminHome = () => {
  return (
    <Container maxWidth="xl">
      <h1>Admin home - todo</h1>
      <Customers/>
    </Container>
  );
};

export default AdminHome;
