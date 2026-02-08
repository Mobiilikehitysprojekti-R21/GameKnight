import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GameSessionStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import { SessionCard } from '../components/SessionCard';
import { GameSession } from '../../domain/entities/Session';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSessions'>

// Mock data for testing
const MOCK_SESSIONS: GameSession[] = [
  {
    session_id: 1,
    game_id: 1,
    played_at: new Date('2026-01-28'),
    location_id: 1,
    group_id: 123,
    players: [
      { user_id: '1', score: 45 },
      { user_id: '2', score: 38 },
      { user_id: '3', score: 52 },
    ],
    notes: 'Hyvä peli!',
  },
  {
    session_id: 2,
    game_id: 2,
    played_at: new Date('2026-01-25'),
    location_id: 23,
    group_id: 124,
    players: [
      { user_id: '1', score: 30 },
      { user_id: '4', score: 42 },
    ],
    notes: '',
  },
    {
    session_id: 3,
    game_id: 1543,
    played_at: new Date('2026-01-20'),
    location_id: null,
    group_id: null,
    players: [
      { user_id: '1', score: 55 },
      { user_id: '2', score: 50 },
    ],
    notes: 'Marko huijas',
  },
];

export default function GameSessionsScreen({navigation}:Props) {

    //const vm = useProfileViewModel(() => navigation.navigate('Home'))
    // TODO: Get sessions from view model
    const sessions = MOCK_SESSIONS; // Replace with actual data
    
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
        {sessions.length > 0 ? (
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
