import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { styles } from '../styles/profileStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import GameCollectionScreen from './GameCollectionScreen';
import { FriendCard } from '../components/FriendCard';
import { useFriendsViewModel } from '../viewModels/useFriendsViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation }: Props) {
  // const vm = useProfileViewModel(() => navigation.navigate('Home'))
  const vm = useFriendsViewModel();

  function chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* OTSIKKO */}
      <View style={styles.header}>
        <Text style={styles.title}>Oma profiili</Text>
        <Text style={styles.subtitle}>Hei, "nickname"!</Text>
      </View>

      {/* ASETUKSET */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Asetukset</Text>
        <View style={styles.settings}>
          <Text style={styles.statText}>
            Käyttäjänimi: "nickname"
          </Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => { }}>
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
        <Text style={styles.sectionTitle}>Kaverit</Text>

        {vm.loading ? (
          <ActivityIndicator />
        ) : vm.friends.length === 0 ? (
          <Text style={styles.statText}>Ei kavereita vielä.</Text>
        ) : (
          chunkArray(vm.friends, 2).map((pair, idx) => (
            <View key={idx} style={{ 
              flexDirection: "row", 
              justifyContent: "flex-start",
              gap: 60,
              marginBottom: 8}}>
              <FriendCard friend={pair[0]} />
              {pair[1] ? <FriendCard friend={pair[1]} /> : <View style={{ flex: 1 }} />}
            </View>
          ))
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Friends')}>
          <Text style={styles.buttonText}>Löydä ja lisää kavereita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}