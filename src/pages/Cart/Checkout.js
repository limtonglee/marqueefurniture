import {
  Button,
  Container,
  Divider,
  Grid,
  ImageList,
  Checkbox,
} from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCartItem, deleteCartItems, getCart } from "../../services/Cart";
import {
  addToCart,
  getListingDetails,
  getSellerInfo,
} from "../../services/Listings";
import { useStores } from "../../stores/RootStore";
import { getCartTotal } from "../../utils/getCartTotal";
import { getTotalPrice } from "../../utils/getTotalPrice";
import { SellerData } from "./SellerData";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Checkout() {
  return <>checkout page</>;
}
