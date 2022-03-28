import * as React from "react";
import { useEffect, useState } from "react";
import { getSellerInfo } from "../../services/Listings";
import { Typography } from "@mui/material";

export const SellerVoucher = ({ listingId }) => {
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const getSellerData = async (listingId) => {
      const response = await getSellerInfo(listingId);
      // console.log(response.data);
      setShopName(response.data[0].shopname);
    };
    getSellerData(listingId);
  }, []);

  return (
      <Typography variant="body2" gutterBottom color="primary.main">
        {shopName}
      </Typography>
  );
};
