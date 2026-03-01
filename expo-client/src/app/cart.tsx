import { View, Text, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { addToCart, decrementFromCart, clearCart } from "../store/shopSlice";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((s: RootState) => s.shop.games);
  const cart = useSelector((s: RootState) => s.shop.cart);

  const rows = cart.map((c) => {
    const game = games.find((g) => g.id === c.gameId)!;
    return { ...c, game };
  });

  const total = rows.reduce((sum, r) => sum + r.qty * r.game.price, 0);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Your Cart</Text>

      {rows.length === 0 ? (
        <Text style={{ opacity: 0.7 }}>Cart is empty. Add some games!</Text>
      ) : (
        <>
          <FlatList
            data={rows}
            keyExtractor={(r) => r.gameId}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 12, gap: 6 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.game.title}</Text>
                <Text>${item.game.price.toFixed(2)} each</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Pressable
                    onPress={() => dispatch(decrementFromCart({ gameId: item.gameId }))}
                    style={{ paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderRadius: 8 }}
                  >
                    <Text>-</Text>
                  </Pressable>

                  <Text style={{ fontSize: 16 }}>Qty: {item.qty}</Text>

                  <Pressable
                    onPress={() => dispatch(addToCart({ gameId: item.gameId }))}
                    style={{ paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderRadius: 8 }}
                  >
                    <Text>+</Text>
                  </Pressable>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, opacity: 0.15, backgroundColor: "#000" }} />
            )}
          />

          <Text style={{ fontSize: 18, fontWeight: "800" }}>
            Total: ${total.toFixed(2)}
          </Text>

          <Pressable
            onPress={() => dispatch(clearCart())}
            style={{ padding: 12, borderWidth: 1, borderRadius: 8, alignItems: "center" }}
          >
            <Text>Clear cart</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}