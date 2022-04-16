import * as React from "react";
import { useEffect, useState } from "react";
import { getSellerInfo } from "../../services/Listings";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StorefrontIcon from '@mui/icons-material/Storefront';


export const SellerData = ({ listingId }) => {
  const [shopName, setShopName] = useState("");
  // const [images, setImages] = useState("");

  useEffect(() => {
    const getSellerData = async (listingId) => {
      console.log("listingId" + listingId);
      const response = await getSellerInfo(listingId);
      // console.log(response.data);
      setShopName(response.data[0].shopname);
    };
    getSellerData(listingId);
  }, []);

  return (
    <Link to={`/SellerProfile`} style={{ textDecoration: "none" }}>
      <Typography variant="body2"  color="primary.main">
        { (shopName !== "") && <>
      <StorefrontIcon/>
        {shopName}
      </>
    }
          </Typography>

    </Link>
  );
};
