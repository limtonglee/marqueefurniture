import { get } from "./api";
// import { foo } from './endpoints';

import { URL_GET_USER_TYPE } from "../services/endpoints";

const getAccountDetails = {
  // return api.postAsJson(
  //     foo
  // )
};

export const getUserType = (userId) => {
  console.log("here", userId);
  const params = {
    userId: userId,
  };
  return get(URL_GET_USER_TYPE, params);
};
