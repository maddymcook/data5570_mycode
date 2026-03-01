import { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router, type Href } from "expo-router";

import type { RootState, AppDispatch } from "../store/store";
import { addToCart } from "../store/shopSlice";
import { GameCard } from "../components/nativewindui/GameCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((s: RootState) => s.shop.games);
  const cartCount = useSelector((s: RootState) =>
    s.shop.cart.reduce((sum, c) => sum + c.qty, 0)
  );

  // Hook requirement
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games;
    return games.filter((g) => g.title.toLowerCase().includes(q));
  }, [query, games]);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Games</Text>

        <Pressable
          onPress={() => router.push("../cart")}
          style={{ paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 8 }}
        >
          <Text>Cart ({cartCount})</Text>
        </Pressable>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search games..."
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onView={() => router.push(`/game/${item.id}` as Href)}
            onAdd={() => dispatch(addToCart({ gameId: item.id }))}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, opacity: 0.15, backgroundColor: "#000" }} />
        )}
      />
    </View>
  );
}