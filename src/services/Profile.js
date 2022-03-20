//for new user sign up

//for signup services

import { URL_EDIT_PFP } from "../services/endpoints";
import { postAsImage } from "./api";

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

export default editProfile;
