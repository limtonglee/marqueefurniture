import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/Admin";
import { applySortFilter } from "../../utils/applySortFilter";
import { getComparator } from "../../utils/getComparator";
import { CustomerListResults } from "./CustomerData/customer-list-result";
import { CustomerListToolbar } from "./CustomerData/customer-list-toolbar";

const MFUsers = () => {
  const [filterName, setFilterName] = useState("");
  const order = "asc";
  const orderBy = "username";
  const [mfusers, setMfusers] = useState([]);
  const [fetchUsers, setFetchUsers] = useState(true);

  useEffect(() => {
    const getUsers = async () =>
      getAllUsers()
        .then((response) => {
          setMfusers(JSON.parse(JSON.stringify(response.data)));
          setFetchUsers(false);
        })
        .catch((error) => {
          console.log(error);
        });
    fetchUsers && getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!fetchUsers]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const users = applySortFilter(
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
