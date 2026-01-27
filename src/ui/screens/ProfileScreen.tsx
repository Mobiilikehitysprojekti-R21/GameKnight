import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/profileStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

export default function ProfileScreen({navigation}:Props) {

    //const vm = useProfileViewModel(() => navigation.navigate('Home'))
    
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
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Lisää peli</Text>
        </TouchableOpacity>
      </View>

      {/* PELATUT PELIT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pelatut pelit</Text>
        <Text style={styles.statText}>
          Lista pelatuista peleistä? Ehkä jokin kuvaaja voitoista/häviöistä?
        </Text>
      </View>

      {/* YSTÄVÄT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ystävät</Text>

        <Text style={styles.statText}>
          Ei ystäviä?
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Etsi ystäviä</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
