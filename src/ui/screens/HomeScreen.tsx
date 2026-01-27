import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/homeStyles';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';

export default function HomeScreen() {
  const { loggedIn, displayName, errorMessage, login, logout } =
    useAuthViewModel();
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
        <TouchableOpacity style={styles.primaryButton}>
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
          {loggedIn
            ? `Kirjautunut käyttäjänä ${displayName}`
            : 'Kirjaudu sisään tallentaaksesi pisteet ja tilastot'}
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={loggedIn ? logout : login}
        >
          <Text style={styles.loginButtonText}>
            {loggedIn ? 'Kirjaudu ulos' : 'Kirjaudu / Luo käyttäjä'}
          </Text>
        </TouchableOpacity>

        {errorMessage && (
          <Text style={[styles.statText, { color: 'red', marginTop: 8 }]}>
            {errorMessage}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
