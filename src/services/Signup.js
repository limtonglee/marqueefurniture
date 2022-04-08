//for new user sign up

//for signup services

import { postAsFormInput, postAsJson } from "./api";
import { URL_SIGNUP } from "../services/endpoints";

const signup = (
  username,
  email,
  contactNumber,
  password,
  address
) => {
  return postAsJson(URL_SIGNUP, {
    username,
    email,
    contactNumber,
    password,
    address,
  });
};

export default signup;
