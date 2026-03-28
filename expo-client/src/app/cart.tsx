import { View, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { addToCart, decrementFromCart, clearCart } from "../store/shopSlice";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { games, cart } = useSelector((s: RootState) => s.shop);

  const rows = cart
    .map((c) => {
      const game = games.find((g) => g.id === c.gameId);
      if (!game) return null;
      return { ...c, game };
    })
    .filter(Boolean) as {
    gameId: number;
    qty: number;
    game: {
      id: number;
      title: string;
      price: string;
      players: string;
      play_time: string;
      description: string;
    };
  }[];

  const total = rows.reduce(
    (sum, row) => sum + Number(row.game.price) * row.qty,
    0
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: "#E0E7FF",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "800", color: "#111827" }}>
        🛒 Your Cart
      </Text>

      {rows.length === 0 ? (
        <Text style={{ color: "#6B7280" }}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={rows}
            keyExtractor={(row) => String(row.gameId)}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 14,
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#111827" }}>
                  {item.game.title}
                </Text>

                <Text style={{ marginTop: 4, color: "#6B7280" }}>
                  ${Number(item.game.price).toFixed(2)} each
                </Text>

                <Text style={{ marginTop: 4, color: "#6B7280" }}>
                  Qty: {item.qty}
                </Text>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                  <Pressable
                    onPress={() => dispatch(addToCart({ gameId: item.gameId }))}
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      backgroundColor: "#6366F1",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "600" }}>+</Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      dispatch(decrementFromCart({ gameId: item.gameId }))
                    }
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: "#D1D5DB",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>-</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <Text style={{ fontSize: 20, fontWeight: "800", color: "#111827" }}>
            Total: ${total.toFixed(2)}
          </Text>

          <Pressable
            onPress={() => dispatch(clearCart())}
            style={{
              padding: 14,
              backgroundColor: "#111827",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Clear Cart</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}