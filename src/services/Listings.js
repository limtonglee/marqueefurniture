//for new user sign up

//for signup services
import { get } from "./api";
import { URL_GET_LISTINGS } from "../services/endpoints";
import { URL_GET_LISTING_DETAILS } from "../services/endpoints";

export const getListings = () => {
  return get(URL_GET_LISTINGS);
};

export const getListingDetails = (id) => {

  const params = {
    listingId: id
  };

  return get(URL_GET_LISTING_DETAILS, params);
};
