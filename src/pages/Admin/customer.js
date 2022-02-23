import { Box, Container } from "@mui/material";
import { CustomerListResults } from "./customer-list-result";
import { CustomerListToolbar } from "./customer-list-toolbar";
import { customers } from "../../data/customer";

const Customers = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Customers;
