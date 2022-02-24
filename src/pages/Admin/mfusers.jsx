
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "./CustomerData/customer-list-result";
import { CustomerListToolbar } from "./CustomerData/customer-list-toolbar";
import { mfusers } from "../../data/mfusers";
import { useState } from "react";

import { getComparator } from "../../utils/getComparator";
import { applySortFilter } from "../../utils/applySortFilter";


const MFUsers = () => {
  const [filterName, setFilterName] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(
    mfusers,
    getComparator(order, orderBy),
    filterName
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={filteredUsers} filterName={filterName} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MFUsers;
