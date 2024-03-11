export const calculateSubtotal = (items) => {
  if (!items) return 0;
  return items.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
};
