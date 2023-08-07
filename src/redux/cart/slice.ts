import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartSliceState, CartItem, RemoveCartItem } from "./types";
import { getItemsFromLS } from "../../utils/getItemsFromLS";

const { totalPrice, items } = getItemsFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem && findItem?.count < 99) {
        findItem.count++;
      } else if (findItem?.count === 99) {
        return;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<RemoveCartItem>) {
      state.items = state.items.filter(
        (obj) =>
          obj.id !== action.payload.id ||
          obj.type !== action.payload.type ||
          obj.size !== action.payload.size
      );

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<RemoveCartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem && findItem?.count > 1) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = CartSlice.actions;

export default CartSlice.reducer;
