
import { get } from "./api";
import { URL_GET_MERCHANT_ORDER } from "../services/endpoints";


export const getOrders = (id) => {

  const params = {
    sellerId: id
  };

  return get(URL_GET_MERCHANT_ORDER, params);
};