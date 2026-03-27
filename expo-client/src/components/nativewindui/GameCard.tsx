import { View, Text, Pressable } from "react-native";

import type { Game } from "../../store/shopSlice";

type GameCardProps = {
  game: Game;
  onView: () => void;
  onAdd: () => void;
};

export function GameCard({ game, onView, onAdd }: GameCardProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
        {game.title}
      </Text>

      <Text style={{ marginTop: 4, color: "#6B7280" }}>
        Players: {game.players} • {game.play_time}
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontSize: 16,
          fontWeight: "700",
          color: "#22C55E",
        }}
      >
        ${Number(game.price).toFixed(2)}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
        <Pressable
          onPress={onView}
          style={{
            padding: 8,
            backgroundColor: "#6366F1",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>View</Text>
        </Pressable>

        <Pressable
          onPress={onAdd}
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 8,
          }}
        >
          <Text>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}
