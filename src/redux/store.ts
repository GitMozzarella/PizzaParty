import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from "./pizza/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    filter: filter,
    cart: cart,
    pizza: pizza,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
