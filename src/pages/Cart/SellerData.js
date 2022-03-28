import * as React from "react";
import { useEffect, useState } from "react";
import { getSellerInfo } from "../../services/Listings";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const SellerData = ({ listingId }) => {
  const [shopName, setShopName] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    const getSellerData = async (listingId) => {
      const response = await getSellerInfo(listingId);
      // console.log(response.data);
      setShopName(response.data[0].shopname);
    };
    getSellerData(listingId);
  });

  return (
    <Link to={`/SellerProfile`} style={{ textDecoration: "none" }}>
      <Typography variant="body2" gutterBottom color="primary.main">
        {shopName}
      </Typography>
    </Link>
  );
};
