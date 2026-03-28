import { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import type { RootState, AppDispatch } from "../store/store";
import { fetchGames, addToCart, deleteGame } from "../store/shopSlice";
import { GameCard } from "../components/nativewindui/GameCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { games, loading, error } = useSelector((s: RootState) => s.shop);

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) => g.title.toLowerCase().includes(q));
  }, [query, games]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E0E7FF",
        padding: 16,
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#111827" }}>
          🎲 Board Game Shop
        </Text>

        <Pressable
          onPress={() => router.push("/add-game")}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 10,
            backgroundColor: "#6366F1",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            + Add Game
          </Text>
        </Pressable>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search games..."
        placeholderTextColor="#9CA3AF"
        style={{
          borderWidth: 1,
          borderColor: "#E0E7FF",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      {loading && <Text style={{ color: "#6B7280" }}>Loading...</Text>}
      {error && <Text style={{ color: "crimson" }}>{error}</Text>}

      {!loading && filtered.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#6B7280" }}>
          No games found 🎲
        </Text>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(g) => String(g.id)}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onView={() =>
              router.push({
                pathname: "/game/[id]",
                params: { id: String(item.id) },
              })
            }
            onAdd={() => dispatch(addToCart({ gameId: item.id }))}
            onDelete={() => dispatch(deleteGame(item.id))}
            />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}