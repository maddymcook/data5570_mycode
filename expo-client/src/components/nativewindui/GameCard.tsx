import { View, Text, Pressable } from "react-native";
import type { Game } from "../../store/shopSlice";

export function GameCard({
  game,
  onView,
  onAdd,
}: {
  game: Game;
  onView: () => void;
  onAdd: () => void;
}) {
  return (
    <View style={{ paddingVertical: 12, gap: 6 }}>
      <Pressable onPress={onView}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>{game.title}</Text>
        <Text style={{ opacity: 0.75 }}>
          Players: {game.players} • {game.minutes} mins
        </Text>
        <Text style={{ marginTop: 4, fontWeight: "600" }}>${game.price.toFixed(2)}</Text>
      </Pressable>

      <Pressable
        onPress={onAdd}
        style={{ alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 8 }}
      >
        <Text>Add to cart</Text>
      </Pressable>
    </View>
  );
}