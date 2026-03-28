import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

export type Game = {
  id: number;
  title: string;
  price: string;
  players: string;
  play_time: string;
  description: string;
};

type CartItem = {
  gameId: number;
  qty: number;
};

type ShopState = {
  games: Game[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
};

const initialState: ShopState = {
  games: [],
  loading: false,
  error: null,
  cart: [],
};

export const fetchGames = createAsyncThunk("shop/fetchGames", async () => {
  const response = await fetch(`${API_BASE_URL}/games/`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return (await response.json()) as Game[];
});

export const deleteGame = createAsyncThunk(
  "shop/deleteGame",
  async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/games/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete game");
    }

    return id;
  }
);

export const createGame = createAsyncThunk(
  "shop/createGame",
  async (newGame: Omit<Game, "id">) => {
    const response = await fetch(`${API_BASE_URL}/games/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });

    if (!response.ok) {
      throw new Error("Failed to create game");
    }

    return (await response.json()) as Game;
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ gameId: number }>) => {
      const { gameId } = action.payload;
      const row = state.cart.find((c) => c.gameId === gameId);
      if (row) row.qty += 1;
      else state.cart.push({ gameId, qty: 1 });
    },
    decrementFromCart: (state, action: PayloadAction<{ gameId: number }>) => {
      const { gameId } = action.payload;
      const row = state.cart.find((c) => c.gameId === gameId);
      if (!row) return;
      row.qty -= 1;
      if (row.qty <= 0) {
        state.cart = state.cart.filter((c) => c.gameId !== gameId);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.games.push(action.payload);
      })
      .addCase(deleteGame.fulfilled, (state, action: PayloadAction<number>) => {
        const id = action.payload;
        state.games = state.games.filter((g) => g.id !== id);
        state.cart = state.cart.filter((c) => c.gameId !== id);
      });
  },
});

export const { addToCart, decrementFromCart, clearCart } = shopSlice.actions;
export default shopSlice.reducer;