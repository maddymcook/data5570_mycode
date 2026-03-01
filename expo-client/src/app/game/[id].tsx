import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, router, type Href } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { addToCart } from "../../store/shopSlice";

export default function GameDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const game = useSelector((s: RootState) => s.shop.games.find((g) => g.id === id));

  if (!game) {
    return (
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>Game not found</Text>
        <Pressable onPress={() => router.back()} style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
          <Text>Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 26, fontWeight: "900" }}>{game.title}</Text>
      <Text style={{ opacity: 0.75 }}>
        Players: {game.players} • {game.minutes} mins
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>${game.price.toFixed(2)}</Text>

      <Pressable
        onPress={() => dispatch(addToCart({ gameId: game.id }))}
        style={{ padding: 12, borderWidth: 1, borderRadius: 8, alignItems: "center" }}
      >
        <Text>Add to cart</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/cart" as Href)} style={{ padding: 12, borderWidth: 1, borderRadius: 8, alignItems: "center" }}>
        <Text>Go to cart</Text>
      </Pressable>
    </View>
  );
}