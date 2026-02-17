import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { useHomeScreenViewModel } from '../viewModels/useHomeScreenViewModel';
import { useProfileScreenViewModel } from '../viewModels/useProfileScreenViewModel';

type Props = NativeStackScreenProps<any>
export default function HomeScreen({ navigation }: Props) {
  const { loggedIn, displayName, errorMessage, login, logout } =
    useAuthViewModel();
  
  const vm = useHomeScreenViewModel()

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

      {!loggedIn && (
        <View style={styles.card}>
        <Text style={styles.sectionTitle}>{`TERVETULOA!`}</Text>

        <Text style={styles.statText}>
          Pelaaminen on parasta kavereiden kanssa.
        </Text>
        <Text style={styles.statText}>
          Liityhän siis mukaan joukkoomme!
        </Text>
        
        </View>
      )}

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
              source={{ uri: vm.avatar_url }}
              style={styles.avatarImage}
            />
            
          )}
          
          </View>
        </View>

          {/* PROFIILI */}
          < View style={styles.card}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('NewGame')}>
              <Text style={styles.buttonText}>Aloita uusi peli</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.buttonText}>Jatka peliä</Text>
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

      {/* TILASTOT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tilastot</Text>
        <Text style={styles.statText}>
          {loggedIn
            ? 'Tarkastele omia pelitilastojasi.'
            : 'Katso yleisiä pelitilastoja. Kirjaudu sisään nähdäksesi omat tilastosi!'}
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Stats')}
        >
          <Text style={styles.loginButtonText}>
            {'Tarkastele pelattuja pelejä'}
          </Text>
        </TouchableOpacity>
      </View>

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

    </ScrollView>
  );
}
