import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GameSessionStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import { SessionCard } from '../components/SessionCard';
import { GameSession } from '../../domain/entities/GameSessions';
import { useGameSessionsViewModel } from '../viewModels/useGameSessionsViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSessions'>

export default function GameSessionsScreen({navigation}:Props) {
  const { sessions, loading } = useGameSessionsViewModel();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Omat pelikerrat</Text>
        <Text style={styles.subtitle}>Montako kertaa pelasit tällä viikolla?</Text>
      </View>

       {/* PELATUT PELIT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Pelatut pelit</Text>
        {loading ? (
          <Text style={styles.statText}>Ladataan...</Text>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <View key={session.session_id} style={styles.sessionCardContainer}>
              <SessionCard session={session} />
            </View>
          ))
        ) : (
          <Text style={styles.statText}>
            Ei vielä pelatuja pelejä
          </Text>
        )}
      </View>

    </ScrollView>
  );
}
