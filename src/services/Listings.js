//for new user sign up

//for signup services
import { get, remove, postAsFormInput } from "./api";
import { URL_GET_LISTINGS } from "../services/endpoints";
import { URL_GET_LISTING_DETAILS } from "../services/endpoints";
import { URL_LISTING_LIKE } from "../services/endpoints";
import { URL_LISTING_UNLIKE } from "../services/endpoints";

export const getListings = () => {
  return get(URL_GET_LISTINGS);
};

export const getListingDetails = (id) => {

  const params = {
    listingId: id
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
