import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import { styles } from '../styles/profileStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import GameCollectionScreen from './GameCollectionScreen';
import { FriendCard } from '../components/FriendCard';
import { useFriendsViewModel } from '../viewModels/useFriendsViewModel';
import { useState, useEffect } from 'react';
import { useProfileScreenViewModel } from '../viewModels/useProfileScreenViewModel';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { colors } from '../styles/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComponent from '../components/Modal';
import DCModalComponent from '../components/DoubleCheckModal';

// Define navigation props for the screen
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  // const vm = useProfileViewModel(() => navigation.navigate('Home'))
  const friendsVm = useFriendsViewModel();

  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  // ViewModel handling profile-related business logic
  // Callbacks are used to close modal and navigate after actions
  const vm = useProfileScreenViewModel(
    () => setModalVisible(false),
    () => navigation.navigate('Home')
  );

  const authVm = useAuthViewModel()

  // state to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [dcModalVisible, setDcModalVisible] = useState(false)

  // state for user´s nickname
  const [userNick, setUserNick] = useState('');

  // Load user´s nickname if user is logged in
  useEffect(() => {
    //if (!vm.isLoggedIn) return;
    if (!authVm.loggedIn) return;

    const loadUserNick = async () => {
      try {
        const nick = await AsyncStorage.getItem('nickname');
        if (nick) {
          setUserNick(nick);
        }
      } catch (e) {
        console.error('Failed to load nickname', e);
      }
    };

    loadUserNick();
  }, [authVm.loggedIn]);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* OTSIKKO */}
        <View style={styles.header}>
          <Text style={styles.title}>Oma profiili</Text>
          <Text style={styles.subtitle}>Hei, {authVm.displayName || 'tyyppi'}!</Text>
        </View>

        {/* ASETUKSET */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Asetukset</Text>
          <View style={styles.settings}>
            <Text style={styles.statText}>
              Käyttäjänimi: {authVm.displayName || 'tuntematon'}
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.settingsButtonText}>Muuta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settings}>
            <Text style={styles.statText}>Poista tili</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => setDcModalVisible(true)}>
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
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('GameCollection')}
          >
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
          <Text style={styles.sectionTitle}>Kaverit</Text>

          {friendsVm.loading ? (
            <ActivityIndicator />
          ) : friendsVm.friends.length === 0 ? (
            <Text style={styles.statText}>Ei kavereita vielä.</Text>
          ) : (
            chunkArray(friendsVm.friends, 2).map((pair, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 60,
                  marginBottom: 8,
                }}
              >
                <FriendCard friend={pair[0]} />
                {pair[1] ? (
                  <FriendCard friend={pair[1]} />
                ) : (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            ))
          )}

          

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Friends')}
          >
            <Text style={styles.buttonText}>Löydä ja lisää kavereita</Text>
          </TouchableOpacity>
        </View>

        {/* Kirjaudu ulos */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Kirjaudu ulos</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={vm.logoutUser}
          >
            <Text style={styles.buttonText}>Kirjaudu ulos</Text>
          </TouchableOpacity>
        </View>
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
          header="Vaihda nimimerkki"
          placeholder="Uusi nimimerkki"
          inputValue={vm.nickname}
          setInputValue={vm.setNickname}
          checkValue={vm.checkNickname}
          isValueAvailable={vm.isNickAvailable}
          onPress={vm.changeNick}
          buttonText="Vaihda"
          showCheck={vm.showCheck}
          trueText="Nickname on vapaa"
          falseText="Nickname on varattu"
        />
        <DCModalComponent
          modalVisible={dcModalVisible}
          setModalVisible={() => setDcModalVisible(false)}
          header="Haluatko varmasti poistaa tilisi?"
          onPress={vm.deleteUser}
          buttonText='Poista tili'
        />

      </ScrollView>

      {/* TOAST is mounted globally in App.tsx */}
    </>
  );
}
