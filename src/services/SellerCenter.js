
import { get, remove, update, postAsFormInput } from "./api";
// orders
import { URL_GET_SHOP_ORDERS } from "../services/endpoints";
import { URL_GET_SHOP_ORDER_DETAIL } from "../services/endpoints";
import { URL_UPDATE_SHOP_ORDER } from "../services/endpoints";
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
// profile
import { URL_GET_SELLER_PROFILE } from "../services/endpoints";
import { URL_EDIT_SELLER_PROFILE } from "../services/endpoints";

// orders
export const getOrders = (id) => {
  const params = {
    sellerId: id
  };
  return get(URL_GET_SHOP_ORDERS, params);
};
export const getOrderDetails = (orderId) => {
  const params = {
    orderId: orderId
  };
  return get(URL_GET_SHOP_ORDER_DETAIL, params);
};
export const updateOrderStatus = (order_status, orderId) => {
  const params = {
    order_status: order_status,
    orderId: orderId,
  };
  return update(URL_UPDATE_SHOP_ORDER, params);
};


// listings
export const getListings = (userId) => {
  const params = {
    userId: userId
  };
  return get(URL_GET_SHOP_LISTINGS, params);
};
export const createListing = (name, image, description, category, brand, warrantyInfo, shippingProvider,
  parcelSize, weight, stockAvailable, listingPrice, variations, dimensions, status, shopId, type) => {
  const body = {
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
    type: type,
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
  const params = {
    voucherId: voucherId,
    name: name,
    minSpend: Number(minSpend),
    discountAmount: Number(discountAmount),
    startDate: startDate,
    endDate: endDate,
    status: status,
  };
  return update(URL_EDIT_SHOP_VOUCHER, params);
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
  const params = {
    name: name,
    shopCategoryId: shopCategoryId,
  };
  return update(URL_EDIT_SHOP_CATEGORY, params);
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

// profile
export const getShopProfile = (id) => {
  const params = {
    userId: id
  };
  return get(URL_GET_SELLER_PROFILE, params);
};
export const editShopProfile = (name, website, description, shopId) => {
  const params = {
    shopId: shopId,
    name: name,
    website: website,
    description: description,
  };
  return update(URL_EDIT_SELLER_PROFILE, params);
};
