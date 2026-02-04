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

      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        backdropColor={colors.background}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.sectionTitle}>
              Vaihda nimimerkki
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='Uusi nimimerkki'
                value={vm.nickname}
                onChangeText={(text) => { vm.setNickname(text) }}
                onEndEditing={vm.checkNickname}
              />
              <TouchableOpacity
                style={[
                  styles.settingsButton,
                  !vm.isNickAvailable && styles.disabledButton
                ]}
                onPress={vm.changeNick}
                disabled={!vm.isNickAvailable}
              >
                <Text>Vaihda</Text>
              </TouchableOpacity>
            </View>
            {vm.showCheck && (
              <Text style={[
                styles.nicknameText,
                vm.isNickAvailable ? styles.available : styles.unavailable
              ]}>
                {vm.isNickAvailable ? 'Nickname on vapaa' : 'Nickname on varattu'}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>

    {/* TOAST MESSAGE */}
      <Toast/>
    </>


  );
}
