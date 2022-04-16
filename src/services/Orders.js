import {URL_GET_ORDERS, URL_RATE_ORDER, URL_RAISE_DISPUTE} from "./endpoints"
import { get, postAsJson } from "./api";

export const getOrders = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_ORDERS, params);
};

export const rateOrder = (userId, orderId, rating, comments) => {
  const body = {
    userId: userId,
    orderId: orderId,
    rating: rating,
    description: comments
  };
  
  return postAsJson(URL_RATE_ORDER, body)
}



export const raiseDispute = (userId, sellerId, orderId, message) => {
  const body = {
    userId: userId,
    sellerId: sellerId,
    orderId: orderId,
    message: message
  };
  
  return postAsJson(URL_RAISE_DISPUTE, body)
}