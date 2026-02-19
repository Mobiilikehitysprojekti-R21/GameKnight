import React from "react";
import { View, Text } from "react-native";
import type { Friend } from "../../domain/entities/Friend";
import { styles } from "../styles/friendStyles";

function statusLabel(status?: Friend["status"]) {
    if (status === "pending") return "⏳ Odottaa";
    if (status === "accepted") return "✅ Kaveri";
  return "";
}

export function FriendCard({ friend }: { friend: Friend }) {
  return (

    <View>
      <Text style={styles.statText}>
        <Text style={{ fontWeight: "bold" }}>👤 {friend.nickname}</Text> {statusLabel(friend.status)}
      </Text>
    </View>
  );
}
