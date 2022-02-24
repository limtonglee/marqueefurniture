import Button from "@mui/material/Button";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <>
      <h1>Users</h1>
      <Outlet />
    </>
  );
};

export default Users;
