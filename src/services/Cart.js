import { URL_GET_CART } from "../services/endpoints";
import { get } from "./api";

export const getCart = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_CART, params);
};
