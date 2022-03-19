//for new user sign up

//for signup services

import { postAsImage, get } from "./api";
import { URL_EDIT_PFP, URL_GET_IMAGE } from "../services/endpoints";

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

export const getImage = () => {

  return get(URL_GET_IMAGE);
};

export default editProfile;
