//for new user sign up

//for signup services
import { get, remove, postAsFormInput } from "./api";
import { URL_GET_LISTINGS } from "../services/endpoints";
import { URL_GET_LISTING_DETAILS } from "../services/endpoints";
import { URL_LISTING_LIKE } from "../services/endpoints";
import { URL_LISTING_UNLIKE } from "../services/endpoints";
import { URL_GET_LISTING_LIKE_USER } from "../services/endpoints";
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

export const likedListing = (listingId, userId) => {
  const body = {
    listingId: listingId,
    userId: userId,
  };
  console.log(listingId, userId);
  return postAsFormInput(URL_LISTING_LIKE, body);
}

export const unlikedListing = (listingId, userId) => {
  const body = {
    listingId: listingId,
    userId: userId,
  };
  return remove(URL_LISTING_UNLIKE, body);
}

export const getLikedListing = (id) => {
  const params = {
    userId: id
  };
  
  return get(URL_GET_LISTING_LIKE_USER, params);
}
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
