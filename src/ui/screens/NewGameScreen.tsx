import { useState, useEffect } from 'react';

import { View, Text, TextInput, Pressable, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BoardGame } from '../../domain/entities/BoardGame';
import { styles } from '../styles/NewGameStyles';
import type { Location } from '../../domain/entities/Location';
import { useFavoriteLocationsViewModel } from '../viewModels/useFavoriteLocationsViewModel';
import { FriendsPicker } from '../components/players/FriendsPicker';
import { useFriendsViewModel } from '../viewModels/useFriendsViewModel';
import { GuestPlayerModal } from '../components/players/GuestPlayerModal';
import { PlayersList } from '../components/players/PlayersList';
import { useGameSessionDraftViewModel } from '../viewModels/useGameSessionDraftViewModel';




/* Types */

type GamePlayer = {
  id?: string;
  name: string;
  type: "USER" | "GUEST";
};

/* Screen */

export const NewGameScreen = () => {

  const navigation = useNavigation<any>();
  const [playerName, setPlayerName] = useState("");
  const { favorites, addFavorite, loading: favoritesLoading } = useFavoriteLocationsViewModel();
  const { friends } = useFriendsViewModel();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const { selectedGame, players, location: gameLocation, setSelectedGame, setPlayers, setLocation, } = useGameSessionDraftViewModel();
  const availableFriends = friends.filter(f => f.id && !players.some(p => p.id === f.id));

  /* Pelaajat */

  const addGuestPlayer = () => {
    if (!playerName.trim()) return;

    setPlayers(prev => [
      ...prev,
      { name: playerName.trim(), type: "GUEST" },
    ]);


    setPlayerName("");
  };

  const addRegisteredPlayer = (user: { id: string; name: string }) => {
    setPlayers(prev => {
      const exists = prev.some(p => p.id === user.id);
      if (exists) return prev;

      return [...prev, { id: user.id, name: user.name, type: "USER" }];
    });
  };


  const removePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, i) => i !== index));
  };

  const movePlayerUp = (index: number) => {
    setPlayers(prev => {
      if (index === 0) return prev;

      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const movePlayerDown = (index: number) => {
    setPlayers(prev => {
      if (index >= prev.length - 1) return prev;

      const copy = [...prev];
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
      return copy;
    });
  };

/* Aloita peli */

const startGame = () => {
  if (!selectedGame || players.length === 0) return;

  const gameSessionDraft = {
    boardGame: selectedGame,
    players,
    location: gameLocation,
    startedAt: new Date(),
  };

  console.log("Starting game:", gameSessionDraft);

  navigation.navigate("ScoreEntry", {
    sessionDraft: gameSessionDraft,
  });
};

/* Pelin valinta */

if (!selectedGame) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Valitse peli</Text>

      <Pressable onPress={() => navigation.navigate("Search")}>
        <Text style={styles.link}>Hae peli</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          setSelectedGame({
            name: "Dummy",
            game_id: 1,
            bgg_id: 0,
            is_expansion: false,
          })
        }
        style={{ marginTop: 16 }}
      >
        <Text style={styles.link}>Valitse Dummy</Text>
      </Pressable>
    </ScrollView>
  );
}

/* Peli valittu */

return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 40 }}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.title}>{selectedGame.name}</Text>

    <Pressable onPress={() => setSelectedGame(null)}>
      <Text style={styles.link}>Vaihda peli</Text>
    </Pressable>

    {/* Pelaajat */}
    <Text style={styles.sectionTitle}>Pelaajat</Text>

    <PlayersList
      players={players}
      onMoveUp={movePlayerUp}
      onMoveDown={movePlayerDown}
      onRemove={removePlayer}
    />

    <FriendsPicker
      friends={availableFriends}
      onSelect={addRegisteredPlayer}
    />

    <Pressable
      style={styles.secondaryButton}
      onPress={() =>
        navigation.navigate("PlayerSearch", {
          onSelect: (user: { id?: string; name: string; type: "USER" | "GUEST" }) => {
            const exists = players.some(p => p.id === user.id);
            if (exists) return;

            setPlayers(prev => {
              const exists = prev.some(p => p.id === user.id);
              if (exists) return prev;

              return [...prev, user];
            });

          },
        })
      }
    >

      <Text style={styles.secondaryButtonText}>
        + Lisää pelaaja
      </Text>
    </Pressable>



    {/* Sijainti */}
    <Text style={styles.sectionTitle}>Sijainti</Text>

    <Pressable onPress={() => navigation.navigate("MapScreen")

    }>
      {/* Suosikkisijainnit */}
      {favorites.length > 0 && (
        <>
          <Text style={styles.sectionSubtitle}>Suosikit</Text>

          {favorites.map((loc) => (
            <Pressable
              key={`${loc.latitude}-${loc.longitude}`}
              style={styles.favoriteLocation}
              onPress={() => setLocation(loc)}
            >
              <Text style={styles.favoriteLocationText}>
                {loc.label}
              </Text>
            </Pressable>
          ))}
        </>
      )}

      <Text style={styles.link}>Valitse sijainti kartalta</Text>
    </Pressable>

    <TextInput
      style={styles.locationInput}
      placeholder="Valitse sijainti"
      value={gameLocation?.label ?? ""}
      editable={false}
    />

    {gameLocation && (
      <Pressable
        onPress={async () => {
          const exists = favorites.some(
            (l) =>
              l.latitude === gameLocation.latitude &&
              l.longitude === gameLocation.longitude
          );

          if (exists) return;

          await addFavorite({
            name: gameLocation.label,
            latitude: gameLocation.latitude,
            longitude: gameLocation.longitude,
          });
          console.log("Saved favorite");
        }}
      >
        <Text style={styles.link}>Tallenna sijainti suosikiksi</Text>
      </Pressable>
    )}


    {/* Aloita peli */}
    <Pressable
      style={styles.primaryButton}
      onPress={startGame}
    >
      <Text style={styles.primaryButtonText}>
        Aloita peli
      </Text>
    </Pressable>

    <GuestPlayerModal
      visible={guestModalOpen}
      onClose={() => setGuestModalOpen(false)}
      onAdd={(name: string) =>
        setPlayers(prev => [...prev, { name, type: "GUEST" as const }])
      }
    />
  </ScrollView>
);
};