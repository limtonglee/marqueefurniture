import {
  URL_BAN_USER,
  URL_CLOSE_DISPUTE_REPORT,
  URL_GET_ALL_USERS,
  URL_GET_DISPUTE_REPORT,
  URL_GET_USERNAME_BY_ID,
  URL_OPEN_DISPUTE_REPORT,
  URL_UNBAN_USER,
} from "../services/endpoints";
import { get, update } from "./api";

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

export const getDisputeReports = () => {
  return get(URL_GET_DISPUTE_REPORT);
};

export const getUsernameById = (userId) => {
  const params = {
    userId: userId,
  };
  return get(URL_GET_USERNAME_BY_ID, params);
};

export const reportOpen = (reportId) => {
  const body = {
    reportId: reportId,
  };
  return update(URL_OPEN_DISPUTE_REPORT, body);
};

export const reportClose = (reportId) => {
  const body = {
    reportId: reportId,
  };
  return update(URL_CLOSE_DISPUTE_REPORT, body);
};
