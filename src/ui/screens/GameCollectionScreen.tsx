import { ScrollView, View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles/gameCollectionStyles';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import { SwipeListView } from 'react-native-swipe-list-view';

type Props = NativeStackScreenProps<RootStackParamList, 'GameCollection'>

export default function GameCollectionScreen({ navigation }: Props) {
  interface Item {
    id: string
    name: string
  }

  const [games, setGames] = useState<Item[]>([
    { id: '1', name: 'The Legend of Zelda: Breath of the Wild' },
  { id: '2', name: 'God of War Ragnarök' },
  { id: '3', name: 'Elden Ring' },
  { id: '4', name: 'Red Dead Redemption 2' },
  { id: '5', name: 'Cyberpunk 2077' },
  ])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const filteredItems = search.trim()
    ? games.filter(game =>
        game.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : games

  return (
    <SwipeListView
      data={filteredItems}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}

      ListHeaderComponent={
        <>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>Oma pelikokoelma</Text>
            <Text style={styles.subtitle}>Upea kokoelma, "nickname"!</Text>
          </View>

          <View style={styles.container}>
            
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setSearch}
                placeholder="Add Item"
              />
              <Button title="Search" onPress={() => {}} />
            </View>
          </View>
        </>
      }

      renderItem={({ item }) => (
        <View style={styles.rowFront}>
          <Text>{item.name}</Text>
        </View>
      )}

      renderHiddenItem={({ item }) => (
        <View style={styles.rowBack}>
          <Button
            title="Delete"
            color="#d11a2a"
            onPress={() =>
              setGames(prev => prev.filter(i => i.id !== item.id))
            }
          />
        </View>
      )}

      rightOpenValue={-100}
      disableRightSwipe
    />
  )
}
