//for new user sign up

//for signup services

import { get } from "./api";
import { URL_GET_LISTINGS } from "../services/endpoints";

export const getListings = () => {
  return get(URL_GET_LISTINGS);
};

