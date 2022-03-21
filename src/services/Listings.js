//for new user sign up

//for signup services
import { get, postAsJson } from "./api";
import {
  URL_GET_LISTINGS,
  URL_GET_LISTING_DETAILS,
  URL_POST_CART_ITEM,
  URL_GET_LISTING_SELLER,
} from "../services/endpoints";

export const getListings = () => {
  return get(URL_GET_LISTINGS);
};

export const getListingDetails = (id) => {
  const params = {
    listingId: id,
  };

  return get(URL_GET_LISTING_DETAILS, params);
};

export const addToCart = (userId, listingId) => {
  const body = {
    userId: userId,
    listingId: listingId,
  };
  return postAsJson(URL_POST_CART_ITEM, body);
};

export const getSellerInfo = (listingId) => {
  const params = {
    listingId: listingId,
  };
  return get(URL_GET_LISTING_SELLER, params);
};