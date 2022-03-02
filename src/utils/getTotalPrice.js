export const getTotalPrice = (unitPrice, quantity) => {
  return (unitPrice * quantity).toFixed(2);
};
