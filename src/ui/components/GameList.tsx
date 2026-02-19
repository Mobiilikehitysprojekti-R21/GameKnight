import { SwipeListView } from "react-native-swipe-list-view"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { BoardGame } from "../../domain/entities/BoardGame"
import { styles } from "../styles/gameCollectionStyles"
import { colors } from "../styles/theme"

const defaultGamePic = require('../../../assets/defaultgamepic.png')

// Component for list of games

type GameListProps = {
  filteredItems: BoardGame[]          // List of boardgames
  games: BoardGame[]                  // list of boardgames (if not filtered)
  userNick: string                    // user´s nickname
  search: string                      // search input
  setSearch: (input: string) => void  // function for search
  setGames: (id: number, userid: string) => void      // function for updating gamelist after removal
  userid: string
  onNewGamePress: () => void          // navigate to NewGame screen
  onAddGamePress: () => void          // open add game modal
}

const GameList = ({ filteredItems, games, userNick, search, setSearch, setGames, userid, onNewGamePress, onAddGamePress }: GameListProps) => {

  return (
    <SwipeListView
      data={filteredItems}
      keyExtractor={(item) => item.game_id.toString()}
      contentContainerStyle={styles.swipeContainer}
      showsVerticalScrollIndicator={false}

      ListHeaderComponent={
        <>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Oma pelikokoelma</Text>
            {games.length > 0 ? (
              <Text style={styles.subtitle}>Upea kokoelma, {userNick || 'tyyppi'}!</Text>
            ) : (
              <Text style={styles.subtitle}>Kuulepas, {userNick || 'tyyppi'}! Missä kaikki pelisi ovat?</Text>
            )
            }
          </View>

          <View style={styles.container}>

            <View style={styles.inputRow}>
              <Text style={styles.subtitle}>Hae peliä</Text>
              <TextInput
                style={styles.input}
                value={search}
                onChangeText={setSearch}
                placeholder="Hae peliä"
              />
            </View>
          </View>
        </>
      }

      renderItem={({ item }) => (
        <View style={styles.rowFront}>

          <Image
            source={item.thumbnail_url ? { uri: item.thumbnail_url } : defaultGamePic}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />

          <Text style={[styles.statText, { flex: 1, flexShrink: 1 }]} numberOfLines={2}>{item.name}</Text>
        </View>
      )}

      renderHiddenItem={({ item }) => (
        <View style={styles.rowBack}>
          <View style={styles.rowBackButtons}>
            <TouchableOpacity style={styles.rowBackIconButton} onPress={onNewGamePress}>
              <Text style={styles.rowBackIcon}>🎲</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rowBackIconButtonDanger}
              onPress={() => setGames(item.bgg_id, userid)}
            >
              <Text style={styles.rowBackIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      rightOpenValue={-110}
      disableRightSwipe

      ListFooterComponent={
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={onAddGamePress}>
            <Text style={styles.settingsButtonText}>Lisää uusi peli</Text>
          </TouchableOpacity>
        </View>
      }
    />
  )


}

export default GameList