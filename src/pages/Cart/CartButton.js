import React, { useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const CartButton = ({ cartCount }) => {
  let navigate = useNavigate();

  return (
    <>
      {cartCount === 0 ? (
        <ShoppingCartCheckoutIcon sx={{ color: "common.black" }} />
      ) : (
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCartCheckoutIcon sx={{ color: "common.black" }} />
        </Badge>
      )}
    </>
  );
};

export default CartButton;
