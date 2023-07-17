import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
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
    minusItem(state, action) {
      const itemId = action.payload;
      const index = state.items.findIndex((item) => item.id === itemId);

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
        state.totalPrice = state.items.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        );
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => {
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

export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
