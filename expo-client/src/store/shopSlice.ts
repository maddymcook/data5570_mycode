import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Game = {
  id: string;
  title: string;
  price: number;
  players: string;
  minutes: string;
};

export type CartItem = {
  gameId: string;
  qty: number;
};

type ShopState = {
  games: Game[];
  cart: CartItem[];
};

const initialState: ShopState = {
  games: [
    { id: "catan", title: "Catan", price: 44.99, players: "3–4", minutes: "60–120" },
    { id: "azul", title: "Azul", price: 39.99, players: "2–4", minutes: "30–45" },
    { id: "wingspan", title: "Wingspan", price: 59.99, players: "1–5", minutes: "40–70" },
    { id: "splendor", title: "Splendor", price: 34.99, players: "2–4", minutes: "30" },
  ],
  cart: [],
};

function findCartIndex(cart: CartItem[], gameId: string) {
  return cart.findIndex((c) => c.gameId === gameId);
}

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ gameId: string }>) => {
      const idx = findCartIndex(state.cart, action.payload.gameId);
      if (idx >= 0) state.cart[idx].qty += 1;
      else state.cart.push({ gameId: action.payload.gameId, qty: 1 });
    },
    decrementFromCart: (state, action: PayloadAction<{ gameId: string }>) => {
      const idx = findCartIndex(state.cart, action.payload.gameId);
      if (idx < 0) return;
      state.cart[idx].qty -= 1;
      if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    },
    removeFromCart: (state, action: PayloadAction<{ gameId: string }>) => {
      state.cart = state.cart.filter((c) => c.gameId !== action.payload.gameId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, decrementFromCart, removeFromCart, clearCart } =
  shopSlice.actions;

export default shopSlice.reducer;