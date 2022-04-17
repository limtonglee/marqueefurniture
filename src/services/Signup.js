//for new user sign up

//for signup services

import { postAsFormInput, postAsJson ,update } from "./api";
import { URL_SIGNUP ,URL_FORGOT_PASSWORD } from "../services/endpoints";

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

export const forgotpw = (email, password) => {
  const body = {
    email : email,
    password : password
  }
  
  return update(URL_FORGOT_PASSWORD, body)
}

export default signup;
