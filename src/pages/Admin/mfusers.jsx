import { Box, Container } from "@mui/material";
import { CustomerListResults } from "./CustomerData/customer-list-result";
import { CustomerListToolbar } from "./CustomerData/customer-list-toolbar";
import { mfusers } from "../../data/mfusers";
import { useEffect, useState } from "react";

import { getComparator } from "../../utils/getComparator";
import { applySortFilter } from "../../utils/applySortFilter";
import { getAllUsers } from "../../services/Admin";

const MFUsers = () => {
  const [filterName, setFilterName] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");
  const [mfusers, setMfusers] = useState([]);
  const [fetchUsers, setFetchUsers] = useState(true);

  useEffect(() => {
    const getUsers = async () => getAllUsers()
      .then((response) => {
        setMfusers(JSON.parse(JSON.stringify(response.data)));
        setFetchUsers(false);
      })
      .catch((error) => {
        console.log(error);
      });
      fetchUsers && getUsers();
  }, [!!fetchUsers]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const users = applySortFilter(mfusers, getComparator(order, orderBy), filterName)

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
            <CustomerListResults
              customers={users}
              setFetchUsers={setFetchUsers}
              filterName={filterName}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MFUsers;
