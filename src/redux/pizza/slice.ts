import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading| success |error
  allItems: [],
};

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
    setAllItems(state, action: PayloadAction<Pizza[]>) {
      state.allItems = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.status = Status.SUCCESS;
      state.allItems = action.payload.allItems;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
