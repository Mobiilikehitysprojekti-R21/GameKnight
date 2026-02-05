import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { styles } from '../styles/profileStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import GameCollectionScreen from './GameCollectionScreen';
import { useState, useEffect } from 'react';
import { colors } from '../styles/theme'
import { useProfileScreenViewModel } from '../viewModels/useProfileScreenViewModel';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '../components/Modal';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation }: Props) {

  const vm = useProfileScreenViewModel(() => setModalVisible(false), () => navigation.navigate('Home'))

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

  return (
    <>
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* OTSIKKO */}
      <View style={styles.header}>
        <Text style={styles.title}>Oma profiili</Text>
        <Text style={styles.subtitle}>Hei, {userNick || 'tyyppi'}!</Text>
      </View>

      {/* ASETUKSET */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Asetukset</Text>
        <View style={styles.settings}>
          <Text style={styles.statText}>
            Käyttäjänimi: {userNick || 'tuntematon'}
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.settingsButtonText}>Muuta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settings}>
          <Text style={styles.statText}>
            Poista tili
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => { }}>
            <Text style={styles.settingsButtonText}>Poista</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* OMAT PELIT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pelikokoelma</Text>
        <Text style={styles.statText}>
          Ei vielä lisättyjä pelejä - Lisää uusi peli
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('GameCollection')}>
          <Text style={styles.buttonText}>Siirry pelikokoelmaan</Text>
        </TouchableOpacity>
      </View>

      {/* PELATUT PELIT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pelatut pelit</Text>
        <Text style={styles.statText}>
          Lista pelatuista peleistä? Ehkä jokin kuvaaja voitoista/häviöistä?
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('GameSessions')}
        >
          <Text style={styles.buttonText}>Näytä pelikerrat</Text>
        </TouchableOpacity>
      </View>

      {/* YSTÄVÄT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ystävät</Text>

        <Text style={styles.statText}>
          Ei ystäviä?
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={() => { }}>
          <Text style={styles.buttonText}>Etsi ystäviä</Text>
        </TouchableOpacity>
      </View>

      {/* Kirjaudu ulos */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Kirjaudu ulos</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={vm.logoutUser}>
          <Text style={styles.buttonText}>Kirjaudu ulos</Text>
        </TouchableOpacity>
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={()=>setModalVisible(false)}
        header='Vaihda nimimerkki'
        placeholder='Uusi nimimerkki'
        inputValue={vm.nickname}
        setInputValue={vm.setNickname}
        checkValue={vm.checkNickname}
        isValueAvailable={vm.isNickAvailable}
        onPress={vm.changeNick}
        buttonText='Vaihda'
        showCheck={vm.showCheck}
        trueText='Nickname on vapaa'
        falseText='Nickname on varattu'
      />
    </ScrollView>

    {/* TOAST MESSAGE */}
      <Toast/>
    </>


  );
}
