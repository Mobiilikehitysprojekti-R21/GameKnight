import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BoardGame } from '../../domain/entities/BoardGame';
import { styles } from '../styles/NewGameStyles';
import { useRoute } from "@react-navigation/native";


/* ===== Types ===== */

type GamePlayer = {
  id?: string;
  name: string;
  type: "USER" | "GUEST";
};

/* ===== Screen ===== */

export const NewGameScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [location, setLocation] = useState("");

  /* ===== Paluu kartalta ===== */
  useEffect(() => {
    if (route.params?.pickedLocation) {
      const { latitude, longitude } = route.params.pickedLocation;
      setLocation(
        `Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`
      );
    }
  }, [route.params]);

  /* ===== Pelaajat ===== */

  const addGuestPlayer = () => {
    if (!playerName.trim()) return;

    setPlayers(prev => [
      ...prev,
      { name: playerName.trim(), type: "GUEST" },
    ]);

    setPlayerName("");
  };

  const addRegisteredPlayer = (user: { id: string; name: string }) => {
    setPlayers(prev => [
      ...prev,
      { id: user.id, name: user.name, type: "USER" },
    ]);
  };

  const removePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  /* ===== Aloita peli ===== */

  const startGame = () => {
    if (!selectedGame || players.length === 0) return;

    const gameSessionDraft = {
      boardGame: selectedGame,
      players,
      location,
      startedAt: new Date(),
    };

    console.log("Starting game:", gameSessionDraft);

    // navigation.navigate("GameSessions", { session: gameSessionDraft });
  };

  /* Pelin valinta */

  if (!selectedGame) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Valitse peli</Text>

        <Pressable onPress={() => navigation.navigate("Search")}>
          <Text style={styles.link}>Hae peli</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setSelectedGame({ id: "1", name: "Dummy" } as BoardGame)
          }
          style={{ marginTop: 16 }}
        >
          <Text>Valitse Dummy</Text>
        </Pressable>
      </View>
    );
  }

  /* Peli valittu */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedGame.name}</Text>

      <Pressable onPress={() => setSelectedGame(null)}>
        <Text style={styles.link}>Vaihda peli</Text>
      </Pressable>

      {/* Pelaajat */}
      <Text style={styles.sectionTitle}>Pelaajat</Text>

      <Pressable
        onPress={() =>
          addRegisteredPlayer({
            id: "u1",
            name: "Rekisteröity Käyttäjä",
          })
        }
      >
        <Text style={styles.link}>
          Lisää rekisteröitynyt pelaaja
        </Text>
      </Pressable>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Vieraspelaajan nimi"
          value={playerName}
          onChangeText={setPlayerName}
        />

        <Pressable onPress={addGuestPlayer} style={styles.addButton}>
          <Text>Lisää vieras</Text>
        </Pressable>
      </View>

      <FlatList
        data={players}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.playerRow}>
            <Text>
              {item.name} {item.type === "GUEST" && "(vieras)"}
            </Text>
            <Pressable onPress={() => removePlayer(index)}>
              <Text>Poista</Text>
            </Pressable>
          </View>
        )}
      />

      {/* Sijainti */}
      <Text style={styles.sectionTitle}>Sijainti</Text>

      <Pressable onPress={() => navigation.navigate("MapPicker")}>
        <Text style={styles.link}>Valitse sijainti kartalta</Text>
      </Pressable>

      <TextInput
        style={styles.locationInput}
        placeholder="Esim. Koti, Mökillä..."
        value={location}
        onChangeText={setLocation}
      />

      {/* Aloita peli */}
      <Pressable
        style={styles.primaryButton}
        onPress={startGame}
      >
        <Text style={styles.primaryButtonText}>
          Aloita peli
        </Text>
      </Pressable>
    </View>
  );
};