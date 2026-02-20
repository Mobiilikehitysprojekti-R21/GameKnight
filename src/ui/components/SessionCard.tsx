import React, { useMemo } from "react";
import { View, Text } from "react-native";
import type { GameSession } from "../../domain/entities/GameSessions";
import { styles } from "../styles/GameSessionStyles";

function formatDateFI(date: Date | string) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
// TODO: finish logic for showing winner and players with scores, also group and location if available
export function SessionCard({ session }: { session: GameSession }) {
  const getPlayerLabel = (player: GameSession['players'][number]) => {
    if (player.name) return player.name;
    if (player.guest_name) return player.guest_name;
    return `Pelaaja ${player.user_id}`;
  };

  const winnerName = useMemo(() => {
    const winner = session.players.reduce((max, p) =>
      (typeof p.score === "number" && typeof max.score === "number" && p.score > max.score) ? p : max
    );
    return winner && typeof winner.score === "number" ? getPlayerLabel(winner) : undefined;
  }, [session.players]);

  const playersLine = useMemo(() => {
    return session.players
      .map(p => (typeof p.score === "number" ? `${getPlayerLabel(p)} ${p.score}` : getPlayerLabel(p)))
      .join(" • ");
  }, [session.players]);

  const groupLine = useMemo(() => {
    return session.group_id ? `Ryhmä: ${session.group_id}` : undefined;
  }, [session.group_id]);

  return (
    <View>
      {/* Peli + pvm */}
      <View style={styles.settings}>
        <Text style={styles.sectionTitle}>
          {`Peli ${session.game_id}`}
        </Text>
        <Text style={styles.sectionTitle}>
          {formatDateFI(session.played_at)}
        </Text>
      </View>

      {/* Pelattu peli */}
      <Text style={styles.subtitle}>
        {session.game_name ? `🎲 ${session.game_name}` : "Ei pelin nimeä"}
      </Text>

      {/* Paikka */}
      <Text style={styles.subtitle}>
        {session.location_name ? `📍 ${session.location_name}` : "📍 (ei paikkaa)"}
      </Text>

      {/* Ryhmä */}
      {groupLine ? (
        <Text style={styles.statText}>
          👥 Ryhmä: {groupLine}
        </Text>
      ) : null}

      {/* Pelaajat + pisteet */}
      <Text style={styles.statText}>
        👤 {playersLine}
      </Text>

      {/* Voittaja */}
      {winnerName ? (
        <Text style={styles.statText}>
          🏆 Voittaja: {winnerName}
        </Text>
      ) : null}

      {/* Muistiinpanot */}
      {session.notes ? (
        <Text style={styles.statText}>
          📝 {session.notes}
        </Text>
      ) : null}
    </View>
  );
}