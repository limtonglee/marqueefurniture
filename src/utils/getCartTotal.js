export const getCartTotal = (items) => {
  var price = 0;

  items.forEach(function (arrayItem) {
    price += arrayItem.price * arrayItem.itemQuantity;
  });

  return price.toFixed(2);
};
