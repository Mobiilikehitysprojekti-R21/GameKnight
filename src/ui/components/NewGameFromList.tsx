import { ReactElement, useMemo } from "react"
import { FlatList, View, Text, TextInput, TouchableOpacity } from "react-native"
import { BoardGame } from "../../domain/entities/BoardGame"
import { styles } from "../styles/gameCollectionStyles"

// Component for Flatlist of games

type NewGameFromListProps = {
    games: BoardGame[]
    userNick: string
    onSelectGame: (game: BoardGame) => void
    // Optional content rendered immediately after the list items
    footerComponent?: ReactElement | null
}

const NewGameFromList = ({ games, userNick, onSelectGame, footerComponent }: NewGameFromListProps) => {

    

    return (
        <FlatList
            data={games}
            keyExtractor={(item) => item.game_id.toString()}
            contentContainerStyle={styles.swipeContainer}
            showsVerticalScrollIndicator={false}

            ListHeaderComponent={
                <>
                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Oma pelikokoelma</Text>
                        {games.length > 0 ? (
                            <Text style={styles.subtitle}>Valitse peli omalta listalta.</Text>
                        ) : (
                            <Text style={styles.subtitle}>Kokoelmasi on vielä tyhjä, {userNick || 'tyyppi'}.</Text>
                        )}
                    </View>

                </>
            }

            renderItem={({ item }) => (
                <TouchableOpacity style={styles.rowFront} onPress={() => onSelectGame(item)}>
                    <Text style={styles.statText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <View style={styles.rowFront}>
                    <Text style={styles.statText}>Ei pelejä hakuehdolla.</Text>
                </View>
            }
            ListFooterComponent={footerComponent ?? null}
        />
    )


}

export default NewGameFromList