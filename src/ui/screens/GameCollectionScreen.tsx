import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles/gameCollectionStyles';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGameCollectionViewModel } from '../viewModels/useGameCollectionViewModel';
import GameList from '../components/GameList';

type Props = NativeStackScreenProps<RootStackParamList, 'GameCollection'>

export default function GameCollectionScreen({ navigation }: Props) {
  
  const vm = useGameCollectionViewModel()
  
  const [modalVisible, setModalVisible] = useState(false)

  const [userNick, setUserNick] = useState('')

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

  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const filteredItems = search.trim()
    ? vm.games.filter(game =>
        game.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : vm.games

  return (
    <>
    <GameList 
    filteredItems={filteredItems} 
    games={vm.games}
    userNick={userNick}
    search={search}
    setSearch={setSearch}
    setGames={vm.handleDeleteGame}
    />
    </>
  )
}
