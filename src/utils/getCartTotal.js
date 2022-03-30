

export const getCartTotal = (items, count, selectedVouchers) => {
  var price = 0;

  const isVoucherPresent = (cartItemId) => {
    let present = 0;
    selectedVouchers.forEach((voucher) => {
      if (voucher.itemId === cartItemId) {
        present = voucher.discountamount;
      }
    });
    return present;
  };

  items.forEach(function (arrayItem) {
    price += (arrayItem.listingprice - isVoucherPresent(arrayItem.id)) * count[arrayItem.id];
  });

  return price.toFixed(2);
};
