import { RootState } from "../store";

export const selectCart = (state: RootState) => {
  const { items, totalPrice } = state.cart;
  if (items.length === 0) {
    return {
      items: [],
      totalPrice: 0,
    };
  }
  return {
    items,
    totalPrice,
  };
};

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
