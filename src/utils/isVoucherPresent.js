export const isVoucherPresent = (cartItemId , selectedVouchers) => {
  let present = 0;
  // console.log(selectedVouchers);
  selectedVouchers.forEach((voucher) => {
    // console.log(voucher.discountamount);
    if (voucher.itemId === cartItemId) {
      present = voucher.discountamount;
    }
  });
  return present;
};