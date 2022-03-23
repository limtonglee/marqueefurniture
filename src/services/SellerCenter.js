
import { get, remove, update, postAsFormInput } from "./api";
// orders
import { URL_GET_SHOP_ORDERS } from "../services/endpoints";
// listings
import { URL_GET_SHOP_LISTINGS } from "../services/endpoints";
import { URL_CREATE_SHOP_LISTING } from "../services/endpoints";
// vouchers
import { URL_GET_SHOP_VOUCHERS } from "../services/endpoints";
import { URL_EDIT_SHOP_VOUCHER } from "../services/endpoints";
import { URL_CREATE_SHOP_VOUCHER } from "../services/endpoints";
import { URL_DELETE_SHOP_VOUCHER } from "../services/endpoints";
// categories
import { URL_GET_SHOP_CATEGORIES } from "../services/endpoints";
import { URL_CREATE_SHOP_CATEGORY } from "../services/endpoints";
import { URL_EDIT_SHOP_CATEGORY } from "../services/endpoints";
import { URL_DELETE_SHOP_CATEGORY } from "../services/endpoints";
import { URL_DELETE_SHOP_CATEGORY_LISTINGS } from "../services/endpoints";

// orders
export const getOrders = (id) => {
  const params = {
    sellerId: id
  };
  return get(URL_GET_SHOP_ORDERS, params);
};

// listings
export const getListings = (userId) => {
  const params = {
    userId: userId
  };
  return get(URL_GET_SHOP_LISTINGS, params);
};
export const createListing = (type, name, image, description, category, brand, warrantyInfo, shippingProvider,
  parcelSize, weight, stockAvailable, listingPrice, variations, dimensions, status, shopId) => {
  const body = {
    type: type,
    name: name,
    image: image,
    description: description,
    category: category,
    brand: brand,
    warrantyInfo: warrantyInfo,
    shippingProvider: shippingProvider,
    parcelSize: parcelSize,
    weight: weight,
    stockAvailable: stockAvailable,
    listingPrice: listingPrice,
    variations: variations,
    dimensions: dimensions,
    status: status,
    shopId: shopId,
  };
  return postAsFormInput(URL_CREATE_SHOP_LISTING, body);
};

// vouchers
export const getVouchers = (id) => {
  const params = {
    shopId: id
  };
  return get(URL_GET_SHOP_VOUCHERS, params);
};
export const createVoucher = (name, minSpend, discountAmount, startDate, endDate, status, shopId) => {
  const body = {
    name: name,
    minSpend: Number(minSpend),
    discountAmount: Number(discountAmount),
    startDate: startDate,
    endDate: endDate,
    status: status,
    shopId: shopId,
  };
  return postAsFormInput(URL_CREATE_SHOP_VOUCHER, body);
};
export const editVoucher = (voucherId, name, minSpend, discountAmount, startDate, endDate, status) => {
  const body = {
    voucherId: voucherId,
    name: name,
    minSpend: Number(minSpend),
    discountAmount: Number(discountAmount),
    startDate: startDate,
    endDate: endDate,
    status: status,
  };
  // console.log('ZZZZ', body);
  return update(URL_EDIT_SHOP_VOUCHER, body);
};
export const deleteVoucher = (voucherId) => {
  const body = {
    voucherId: voucherId,
  };
  return remove(URL_DELETE_SHOP_VOUCHER, body);
};

// categories
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
export const editShopCategory = (name, shopCategoryId) => {
  const body = {
    name: name,
    shopCategoryId: shopCategoryId,
  };
  return update(URL_EDIT_SHOP_CATEGORY, body);
};
export const deleteShopCategory = (shopCategoryId) => {
  const body = {
    shopCategoryId: shopCategoryId,
  };
  return remove(URL_DELETE_SHOP_CATEGORY, body);
};
export const deleteShopCategoryListings = (shopCategoryId) => {
  const body = {
    shopCategoryId: shopCategoryId,
  };
  return remove(URL_DELETE_SHOP_CATEGORY_LISTINGS, body);
};
