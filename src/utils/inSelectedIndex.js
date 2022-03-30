export const inSelectedIndex = (item , selectedItemsId) => {
  let match = false;
  selectedItemsId.forEach((element) => {
    if (element === item.id) {
      match = true;
    }
  });
  return match;
};
