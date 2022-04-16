import { get, update } from "./api";

import { URL_GET_ALL_USERS, URL_BAN_USER , URL_UNBAN_USER} from "../services/endpoints";

export const getAllUsers = () => {
  return get(URL_GET_ALL_USERS);
};

export const banUser = (userId) => {
  const body = {
    userId: userId,
  };
  return update(URL_BAN_USER, body);
};

export const unbanUser = (userId) => {
  const body = {
    userId: userId,
  };
  return update(URL_UNBAN_USER, body);
};