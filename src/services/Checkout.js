import { URL_CHECKOUT } from "./endpoints";
import { postAsJson } from "./api";

export const checkout = (
  address,
  message={},
  price,
  sellerId,
  buyerId,
  listingId,
  voucherId = {},
  quantity
) => {
  const body = {
    address: address,
    message: message,
    price: price,
    sellerId: sellerId,
    buyerId: buyerId,
    listingId: listingId,
    voucherId: voucherId,
    quantity: quantity,
  };
  return postAsJson(URL_CHECKOUT, body);
};
