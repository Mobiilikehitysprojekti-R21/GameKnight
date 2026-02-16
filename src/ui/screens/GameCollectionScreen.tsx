import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/gameCollectionStyles';
import { useState, useEffect, useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameCollectionViewModel } from '../viewModels/useGameCollectionViewModel';
import GameList from '../components/GameList';
import ModalComponent from '../components/Modal';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { BoardGameApiRepository } from '../../infrastructure/api/BoardGameApiRepository';

// Define navigation props for the screen
type Props = NativeStackScreenProps<RootStackParamList, 'GameCollection'>

export default function GameCollectionScreen({ navigation }: Props) {

  const auth = useAuthViewModel()

  const repo = useMemo(
    () => new BoardGameApiRepository(auth.getAccessToken),
    [auth.getAccessToken]
  )

  // ViewModel that contains business logic and state
  const vm = useGameCollectionViewModel(repo)

  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false)

  
  const [newGame, setNewgame] = useState('')    // input value for adding a new game
  const [search, setSearch] = useState('')      // input value for searching a game


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
        onNewGamePress={() => navigation.navigate('NewGame')}
        games={vm.games}
        userNick={auth.displayName}
        search={search}
        setSearch={setSearch}
        setGames={vm.handleDeleteGame}
        userid={String(vm.auth0_id)}
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
        showCheck={vm.isGameAdded}
        trueText=''
        falseText='Peli on lisätty kokoelmaasi'
        buttonText='Lisää'
      />
    </View>
  )
}
