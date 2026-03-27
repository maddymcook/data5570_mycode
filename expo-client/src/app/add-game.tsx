import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { router } from "expo-router";

import type { AppDispatch } from "../store/store";
import { createGame } from "../store/shopSlice";

export default function AddGamePage() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [players, setPlayers] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !price || !players || !playTime) {
      alert("Please fill out title, price, players, and play time.");
      return;
    }

    await dispatch(
      createGame({
        title,
        price,
        players,
        play_time: playTime,
        description,
      })
    );

    setTitle("");
    setPrice("");
    setPlayers("");
    setPlayTime("");
    setDescription("");

    router.push("/");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 12,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 8 }}>
        Add a Board Game
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      <TextInput
        placeholder="Players (example: 2-4)"
        value={players}
        onChangeText={setPlayers}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      <TextInput
        placeholder="Play time (example: 45 min)"
        value={playTime}
        onChangeText={setPlayTime}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "white",
          minHeight: 120,
          textAlignVertical: "top",
        }}
      />

      <Pressable
        onPress={handleSubmit}
        style={{
          marginTop: 8,
          padding: 14,
          backgroundColor: "#111",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
          Save Game
        </Text>
      </Pressable>
    </ScrollView>
  );
}