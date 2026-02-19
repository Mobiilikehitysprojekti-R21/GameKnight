import { ScrollView, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../styles/GameSessionStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types'
import { SessionCard } from '../components/SessionCard';
import { GameSession } from '../../domain/entities/GameSessions';
import { useUserGameSessionsViewModel } from '../viewModels/useUserGameSessionsViewModel';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'GameSessions'>

export default function GameSessionsScreen({ navigation }: Props) {
  const { user } = useAuthViewModel();

  const numericUserId =
    typeof user?.user_id === 'number'
      ? user.user_id
      : typeof user?.user_id === 'string' && user.user_id.trim() !== ''
        ? Number(user.user_id)
        : null;

  const { sessions, loading } = useUserGameSessionsViewModel(
    Number.isFinite(numericUserId) ? numericUserId : null
  );

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
        <View style={[styles.settings, { justifyContent: "space-between", alignItems: "center" }]}>
          <Pressable style={{ padding: 8 }} onPress={() => navigation.navigate("Home")}>
            <Text style={{ fontSize: 15, color: "#8B5CF6", fontWeight: "600" }}>← Aloitusnäytölle</Text>
          </Pressable></View>

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
