export const getCartTotal = (items, count) => {
  var price = 0;

  items.forEach(function (arrayItem) {
    price += arrayItem.listingprice * count[arrayItem.id];
  });

  return price.toFixed(2);
};
