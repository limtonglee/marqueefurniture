import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Tooltip } from "@mui/material";
import Badge from "@mui/material/Badge";
import React from "react";
import { useNavigate } from "react-router-dom";

const CartButton = ({ cartCount }) => {
  let navigate = useNavigate();

  return (
    <>
      {cartCount === 0 ? (
        <Tooltip title="Cart" placement="right">
          <ShoppingCartCheckoutIcon sx={{ color: "common.black" }} />
        </Tooltip>
      ) : (
        <Badge badgeContent={cartCount} color="error">
          <Tooltip title="Cart" placement="right">
            <ShoppingCartCheckoutIcon sx={{ color: "common.black" }} />
          </Tooltip>
        </Badge>
      )}
    </>
  );
};

export default CartButton;
