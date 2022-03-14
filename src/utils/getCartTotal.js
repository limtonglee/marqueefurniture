export const getCartTotal = (items) => {
  var price = 0;

  items.forEach(function (arrayItem) {
    price += arrayItem.listingprice * arrayItem.itemQuantity;
  });

  return price.toFixed(2);
};
