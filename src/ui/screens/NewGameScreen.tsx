
import { useState, useEffect, useMemo } from 'react';

import { View, Text, TextInput, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BoardGame } from '../../domain/entities/BoardGame';
import { styles } from '../styles/NewGameStyles';
import { useFavoriteLocationsViewModel } from '../viewModels/useFavoriteLocationsViewModel';
import { FriendsPicker } from '../components/players/FriendsPicker';
import { useFriendsViewModel } from '../viewModels/useFriendsViewModel';
import { GuestPlayerModal } from '../components/players/GuestPlayerModal';
import { PlayersList } from '../components/players/PlayersList';
import { useAuth } from '../auth/useAuth';
import { useGameSessionDraft } from '../context/GameSessionDraftContext';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { BoardGameApiRepository } from '../../infrastructure/api/BoardGameApiRepository';
import { useGameCollectionViewModel } from '../viewModels/useGameCollectionViewModel';
import NewGameFromList from '../components/NewGameFromList';
import ModalComponent from '../components/Modal';


/* Types */

type GamePlayer = {
  id?: string;
  name: string;
  type: "USER" | "GUEST";
};

/* Screen */

export const NewGameScreen = () => {

  const navigation = useNavigation<any>();
  const authVm = useAuthViewModel(); // AuthViewModel provides the access token function for authenticated API calls
  // Build board game repository with current user
  const gameRepo = useMemo(
    () => new BoardGameApiRepository(authVm.getAccessToken),
    [authVm.getAccessToken]
  );

  const gameCollectionVm = useGameCollectionViewModel(gameRepo);  // ViewModel for loading the user's own game collection and game search

  const { favorites, addFavorite } = useFavoriteLocationsViewModel();
  const { friends } = useFriendsViewModel();
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const { selectedGame, players, location, setSelectedGame, setPlayers, setLocation, } = useGameSessionDraft();
  const availableFriends = friends.filter(f => f.user_id && !players.some(p => p.id?.toString() === f.user_id.toString()));
  const { user } = useAuth();

  const [modalVisible, setModalVisible] = useState(false)       // Controls visibility of the "search other games" modal
  const [newGame, setNewGame] = useState('')                    // Input value used in modal search field
  const [searchedGame, setSearchedGame] = useState<BoardGame | null>(null) // Selected game from modal search results
  const [isModalGameChosen, setIsModalGameChosen] = useState(false)       // Enables modal confirm button after user picks a search result

  /* Pelaajat */

  useEffect(() => {
    if (!user?.sub) return;

    setPlayers(prev => {
      const exists = prev.some(p => p.id === user.sub);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: user.sub,
          name: user.nickname ?? user.name,
          type: "USER",
        },
      ];
    });
  }, [user?.sub]);

  console.log("Auth user:", user);

  const addGuestPlayer = (name: string) => {
    if (!name.trim()) return;

    setPlayers(prev => [
      ...prev,
      {
        id: `guest-${Date.now()}-${Math.random()}`,
        name: name.trim(),
        type: "GUEST"
      },
    ]);
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
      location,
      startedAt: new Date(),
    };

    console.log("Starting game:", gameSessionDraft);

    navigation.navigate("ScoreEntry");
  };

  // Function for opening search modal
  const openSearchModal = () => {
    // Clear earlier search, and reset game choice before opening modal
    setNewGame('')
    setSearchedGame(null)
    setIsModalGameChosen(false)
    setModalVisible(true)
  }

  // Function to close search modal
  const closeSearchModal = (value: boolean) => {
    setModalVisible(value)

    if (!value) {
      // Clear state values before closing
      setNewGame('')
      setSearchedGame(null)
      setIsModalGameChosen(false)
    }
  }

  // Function to handle game selection
  const chooseGameFromModal = (game: BoardGame) => {
    setSearchedGame(game) // set selected game as chosen
    setIsModalGameChosen(true) // Enable "Valitse" button after user has selected game
  }

  // Function to confirm chosen game
  const applySelectedGameFromModal = () => {
    if (!searchedGame) return

    setSelectedGame(searchedGame) // Selected game is set to the game of the game session
    closeSearchModal(false) // Modal is closed
  }

  /* Pelin valinta */

  if (!selectedGame) {
    return (
      <View style={styles.menuContainer}>

        {/*If user has games on game collection, game can be chosen straight from the list*/}
        <NewGameFromList
          games={gameCollectionVm.games}
          userNick={authVm.displayName}
          onSelectGame={setSelectedGame}
          footerComponent={
            // Game can also be chosen outside from the list by opening modal
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={openSearchModal}
            >
              <Text style={styles.settingsButtonText}>Hae peliä jota ei ole listassa</Text>
            </TouchableOpacity>
          }
        />

        {/*Game can be also searched from the db via modal*/}
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={closeSearchModal}
          header='Mitä tänään pelataan?'
          placeholder='Valitse peli'
          inputValue={newGame}
          setInputValue={setNewGame}
          checkValue={() => gameCollectionVm.findGame(newGame)}
          games={gameCollectionVm.searhedGame}
          onSelected={chooseGameFromModal}
          isValueAvailable={isModalGameChosen}
          onPress={applySelectedGameFromModal}
          showCheck={false}
          trueText=''
          falseText=''
          buttonText='Valitse'
        />
      </View>
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
        value={location?.label ?? ""}
        editable={false}
      />

      {location && (
        <Pressable
          onPress={async () => {
            const exists = favorites.some(
              (l) =>
                l.latitude === location.latitude &&
                l.longitude === location.longitude
            );

            if (exists) return;

            await addFavorite({
              name: location.label,
              latitude: location.latitude,
              longitude: location.longitude,
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
        onAdd={addGuestPlayer}
      />
    </ScrollView>
  );

};
