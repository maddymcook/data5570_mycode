import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export const API_BASE_URL = "http://127.0.0.1:8000/api";

export type Game = {
  id: number;
  title: string;
  price: string;
  players: string;
  play_time: string;
  description: string;
};

type ShopState = {
  games: Game[];
  loading: boolean;
  error: string | null;
};

const initialState: ShopState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk("shop/fetchGames", async () => {
  const response = await fetch(`${API_BASE_URL}/games/`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return (await response.json()) as Game[];
});

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
  reducers: {},
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
      });
  },
});

export default shopSlice.reducer;