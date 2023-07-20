import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getItemsFromLS } from "../../utils/getItemsFromLS";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getItemsFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const index = state.items.findIndex((obj) => obj.id === itemId);

      if (index !== -1) {
        const currentItem = state.items[index];
        if (currentItem.count > 1) {
          currentItem.count--;
        } else {
          const confirmation = window.confirm("Вы удаляете пиццу. Вы уверены?");
          if (confirmation) {
            state.items.splice(index, 1);
          }
        }
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
