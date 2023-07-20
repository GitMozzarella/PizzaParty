export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  sizes: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
