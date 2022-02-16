import Button from "@mui/material/Button";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { ImageListItemBar } from "@mui/material";
import { itemData } from "../../data/itemData";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Outlet } from "react-router-dom";

const MarketPlace = () => {
  return (
    <div>
      <h1>marketplace</h1>
      <Outlet/>
    </div>
  );
};

export default MarketPlace;
