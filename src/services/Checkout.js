import { URL_CHECKOUT , URL_PAYMENT } from "./endpoints";
import { postAsJson } from "./api";

export const checkout = (
  address,
  message={},
  price,
  sellerId,
  buyerId,
  listingId,
  voucherId = {},
  quantity,
  paymentMethod
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
    paymentMethod: paymentMethod,
  };
  return postAsJson(URL_CHECKOUT, body);
};

export const payment = (amount, id) => {
  const body = {
    amount: parseInt(amount*100),
    id: id,
  }
  return postAsJson(URL_PAYMENT, body)
}