//for new user sign up

//for signup services

import { postAsFormInput } from "./api";
import { URL_SIGNUP } from "../services/endpoints";

const signup = (
  firstName,
  lastName,
  username,
  email,
  contactNumber,
  password,
  address
) => {
  return postAsFormInput(URL_SIGNUP, {
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    password,
    address,
  });
};

export default signup;
