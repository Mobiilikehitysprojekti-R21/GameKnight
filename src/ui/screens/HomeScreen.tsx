import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import SignUpScreen from './SignUpScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>

export default function HomeScreen({navigation}:Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* OTSIKKO */}
      <View style={styles.header}>
        <Text style={styles.title}>GameKnight</Text>
        <Text style={styles.subtitle}>Remember every game night!</Text>
      </View>

      {/* PÄÄTOIMINNOT */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Aloita uusi peli</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Jatka peliä</Text>
        </TouchableOpacity>
      </View>

      {/* TILASTOT (placeholder) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tilastot</Text>
        <Text style={styles.statText}>
          Ei vielä pelihistoriaa – pelaa ensimmäinen peli!
        </Text>
      </View>

      {/* KIRJAUTUMINEN */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Käyttäjä</Text>

        <Text style={styles.statText}>
          Kirjaudu sisään tallentaaksesi pisteet ja tilastot
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.loginButtonText}>Kirjaudu / Luo käyttäjä</Text>
        </TouchableOpacity>
      </View>

    <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profiili</Text>

        <Text style={styles.statText}>
          Siirry profiilisivulle
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.loginButtonText}>Profiilisivu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
