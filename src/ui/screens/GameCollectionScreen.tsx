import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { styles } from '../styles/gameCollectionStyles';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameCollectionViewModel } from '../viewModels/useGameCollectionViewModel';
import GameList from '../components/GameList';
import { colors } from '../styles/theme'
import ModalComponent from '../components/Modal';

type Props = NativeStackScreenProps<RootStackParamList, 'GameCollection'>

export default function GameCollectionScreen({ navigation }: Props) {
  
  const vm = useGameCollectionViewModel()
  
  const [modalVisible, setModalVisible] = useState(false)

  const [userNick, setUserNick] = useState('')
  const [newGame, setNewgame]= useState('')
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  // hae käyttäjän nick
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

  

  const filteredItems = search.trim()
    ? vm.games.filter(game =>
        game.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : vm.games

  return (
    <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
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
        setModalVisible={()=>setModalVisible(false)}
        header='Lisää uusi peli kokoelmaasi'
        placeholder='Uusi peli'
        inputValue={newGame}
        setInputValue={setNewgame}
        checkValue={()=>vm.findGame}
        isValueAvailable={vm.isGameChosen}
        onPress={()=>vm.addGame}
        buttonText='Lisää'
        showCheck={vm.isGameAdded}
        trueText='Nickname on vapaa'
        falseText='Nickname on varattu'
      />
    </ScrollView>
  )
}
