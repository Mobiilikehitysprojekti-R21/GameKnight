import { SwipeListView } from "react-native-swipe-list-view"
import { View, Text, TextInput, Button } from "react-native"
import { BoardGame } from "../../domain/entities/BoardGame"
import { styles } from "../styles/gameCollectionStyles"
import { colors } from "../styles/theme"

// Component for list of games

type GameListProps = {
    filteredItems: BoardGame[]          // List of boardgames
    games: BoardGame[]                  // list of boardgames (if not filtered)
    userNick: string                    // user´s nickname
    search: string                      // search input
    setSearch: (input: string) => void  // function for search
    setGames: (id: number) => void      // function for updating gamelist after removal

}

const GameList = ({filteredItems, games, userNick, search, setSearch, setGames}: GameListProps) => {

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
                  <Text style={styles.statText}>{item.name}</Text>
                </View>
              )}
        
              renderHiddenItem={({ item }) => (
                <View style={styles.rowBack}>
                  <Button
                    title="Aloita peli"
                    color={colors.primary}
                    onPress={()=>{}}
                  />
                  <Button
                    title="Delete"
                    color="#d11a2a"
                    onPress={()=>setGames(item.bgg_id)}
                  />
                </View>
              )}
        
              rightOpenValue={-100}
              disableRightSwipe
            />
    )


}

export default GameList