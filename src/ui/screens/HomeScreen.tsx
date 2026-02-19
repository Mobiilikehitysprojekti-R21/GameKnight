import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { useHomeScreenViewModel } from '../viewModels/useHomeScreenViewModel';
import { useProfileScreenViewModel } from '../viewModels/useProfileScreenViewModel';
import { useGameSessionsViewModel } from '../viewModels/useGameSessionsViewModel';
import { calculateGeneralStats } from '../utils/statsCalculator';
import { StatsCharts } from '../utils/statsVisualization';

type Props = NativeStackScreenProps<any>
export default function HomeScreen({ navigation }: Props) {
  const { loggedIn, displayName, errorMessage, login, logout } =
    useAuthViewModel();

  const vm = useHomeScreenViewModel();
  const { sessions } = useGameSessionsViewModel();
  const generalStats = calculateGeneralStats(sessions);

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



      {loggedIn && (
        <>
          {/*TERVEHDYS*/}
          <View style={styles.card}>
            <View style={styles.greetingRow}>
              <View >
                <Text style={styles.sectionTitle}>{`Hei, ${displayName}!`}</Text>
                <Text style={styles.statText}>
                  Mukava nähdä taas ❤️
                </Text>

              </View>
              {vm.avatar_url && (
                <Image
                  key={vm.avatar_url}
                  source={{ uri: vm.avatar_url }}
                  style={styles.avatarImage}
                />

              )}

            </View>
          </View>

          {/* PELI -TOIMINNALLISUUS */}
          < View style={styles.card}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('NewGame')}>
              <Text style={styles.buttonText}>Aloita uusi peli</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.buttonText}>Jatka peliä</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tilastot</Text>
            <Text style={styles.statText}>
              Tarkastele omia pelitilastojasi
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Stats')}
            >
              <Text style={styles.loginButtonText}>
                Omat pelitilastot
              </Text>
            </TouchableOpacity>
          </View>

          {/* PROFIILI */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Profiili</Text>

            <Text style={styles.statText}>
              Siirry profiilisivulle
            </Text>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.loginButtonText}>Profiilisivu</Text>
            </TouchableOpacity>
          </View>
        </>
      )
      }

      {/* KIRJAUTUMINEN */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Käyttäjä</Text>

        <Text style={styles.statText}>
          {loggedIn
            ? `Kirjautunut käyttäjänä: ${displayName}`
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

      {/* TILASTOT */}
      {!loggedIn && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Pelitilastot</Text>
            {!sessions || sessions.length === 0 ? (
              <Text style={styles.statText}>Ei dataa saatavilla tai lataus epäonnistui</Text>
            ) : (
              <>
                <Text style={styles.statText}>Rekisteröityneitä käyttäjiä: {generalStats.userCount}</Text>
                <Text style={styles.statText}>Pelattujen pelien määrä: {generalStats.totalGamesCount}</Text>
                <Text style={styles.statText}>Eniten voittanut pelaaja: {generalStats.mostWinningPlayer}</Text>
                <StatsCharts generalStats={generalStats} />
              </>
            )}
          </View>
        </>
      )}


    </ScrollView>
  );
}
