//for new user sign up

//for signup services

import { URL_EDIT_PFP , URL_CREATE_SHOP } from "../services/endpoints";
import { postAsImage, postAsJson } from "./api";

const editProfile = (formData, headers) => {
  console.log(formData.get("image"));
  return postAsImage(
    URL_EDIT_PFP,
    {
      formData,
    },
    headers
  );
};

export const createShop = (userId, shopName, website, description) => {
  const body = {
    userId: userId,
    shopName: shopName,
    website: website,
    description: description,
  };
  return postAsJson(URL_CREATE_SHOP, body);
};

export default editProfile;
