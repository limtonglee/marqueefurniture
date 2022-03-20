
import { get, remove, update, postAsFormInput } from "./api";
// orders
import { URL_GET_SHOP_ORDERS } from "../services/endpoints";
// listings
import { URL_GET_SHOP_LISTINGS } from "../services/endpoints";
// vouchers
import { URL_GET_SHOP_VOUCHERS } from "../services/endpoints";
import { URL_EDIT_SHOP_VOUCHER } from "../services/endpoints";
import { URL_CREATE_SHOP_VOUCHER } from "../services/endpoints";
import { URL_DELETE_SHOP_VOUCHER } from "../services/endpoints";
// categories
import { URL_GET_SHOP_CATEGORIES } from "../services/endpoints";
import { URL_CREATE_SHOP_CATEGORY } from "../services/endpoints";


export const getOrders = (id) => {

  const params = {
    sellerId: id
  };

  return get(URL_GET_SHOP_ORDERS, params);
};

export const getListings = (userId) => {

  const params = {
    userId: userId
  };

  return get(URL_GET_SHOP_LISTINGS, params);
};

export const getVouchers = (id) => {

  const params = {
    shopId: id
  };

  return get(URL_GET_SHOP_VOUCHERS, params);
};

export const getShopCategories = (id) => {

  const params = {
    userId: id
  };

  return get(URL_GET_SHOP_CATEGORIES, params);
};

export const createShopCategory = (name, shopId) => {
  const body = {
    name: name,
    shopId: shopId,
  };
  return postAsFormInput(URL_CREATE_SHOP_CATEGORY, body);
};