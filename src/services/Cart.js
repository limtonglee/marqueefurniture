import {
  URL_GET_CART,
  URL_DELETE_CART_ITEM,
  URL_DELETE_CART_ITEMS,
} from "../services/endpoints";
import { get, remove } from "./api";

export const getCart = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_CART, params);
};

export const deleteCartItem = (userId, listingId) => {
  const params = {
    userId: userId,
    listingId: listingId,
  };
  return remove(URL_DELETE_CART_ITEM, params);
};

export const deleteCartItems = (userId, listingId) => {
  const params = {
    userId: userId,
    listingId: listingId,
  };
  return remove(URL_DELETE_CART_ITEMS, params);
};
