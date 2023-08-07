export type Pizza = {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  count: number;
  types: {
    sizes: number[];
    prices: number[];
  }[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  allItems: Pizza[];
}
export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
};
