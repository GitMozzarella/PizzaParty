import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<
  { items: Pizza[]; allItems: Pizza[] },
  SearchPizzaParams
>("pizza/fetchPizzasStatus", async (params) => {
  const { category, sortBy, order, search, currentPage } = params;
  const { data: items } = await axios.get<Pizza[]>(
    `https://64aacef60c6d844abededb01.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  const { data: allItems } = await axios.get<Pizza[]>(
    `https://64aacef60c6d844abededb01.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return { items, allItems };
});
