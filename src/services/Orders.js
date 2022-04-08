import {URL_GET_ORDERS} from "./endpoints"
import { get } from "./api";

export const getOrders = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_ORDERS, params);
};