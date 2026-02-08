import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/gameCollectionStyles';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameCollectionViewModel } from '../viewModels/useGameCollectionViewModel';
import GameList from '../components/GameList';
import ModalComponent from '../components/Modal';

// Define navigation props for the screen
type Props = NativeStackScreenProps<RootStackParamList, 'GameCollection'>

export default function GameCollectionScreen({ navigation }: Props) {

  // ViewModel that contains business logic and state
  const vm = useGameCollectionViewModel()

  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false)

  const [userNick, setUserNick] = useState('')  // state for user´s nickname
  const [newGame, setNewgame] = useState('')    // input value for adding a new game
  const [search, setSearch] = useState('')      // input value for searching a game

  // Load user´s nickname if user is logged in
  useEffect(() => {
    if (!vm.isLoggedIn) return

    const loadUserNick = async () => {
      try {
        const nick = await AsyncStorage.getItem('nickname')
        if (nick) {
          setUserNick(nick)
        }
      } catch (e) {
        console.error('Failed to load nickname', e)
      }
    }

    loadUserNick()
  }, [vm.isLoggedIn])


  // Filter games based on input
  const filteredItems = search.trim()
    ? vm.games.filter(game =>
      game.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    : vm.games

  return (
    <View
      style={styles.scrollContainer}
    >
      <GameList
        filteredItems={filteredItems}
        games={vm.games}
        userNick={userNick}
        search={search}
        setSearch={setSearch}
        setGames={vm.handleDeleteGame}
      />
      <View style={styles.card}>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.settingsButtonText}>Lisää uusi peli</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        header='Lisää uusi peli kokoelmaasi'
        placeholder='Uusi peli'
        inputValue={newGame}
        setInputValue={setNewgame}
        checkValue={() => vm.findGame(newGame)}
        games={vm.searhedGame}
        onSelected={vm.chooseGame}
        isValueAvailable={vm.isGameChosen}
        onPress={vm.addGame}
        buttonText='Lisää'
      />
    </View>
  )
}
