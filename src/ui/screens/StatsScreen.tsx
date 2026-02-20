import { useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/statStyles';
import { useGameSessionsViewModel } from '../viewModels/useGameSessionsViewModel';
import { useUserGameSessionsViewModel } from '../viewModels/useUserGameSessionsViewModel';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { calculateUserStats, calculateGeneralStats } from '../utils/statsCalculator';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatsCharts } from '../utils/statsVisualization';
import { useSessionNotifications } from '../viewModels/useSessionNotifications';

type Props = NativeStackScreenProps<RootStackParamList, 'Stats'>;

export default function StatsScreen({ navigation }: Props) {
    const { sessions, loading: generalLoading } = useGameSessionsViewModel();
    const { user } = useAuthViewModel();
    const { notifyStatsUpdate } = useSessionNotifications();
    const previousUserStatsRef = useRef<{ gamesPlayed: number; gamesWonPercentage: number } | null>(null);

    const numericUserId =
        typeof user?.user_id === 'number'
            ? user.user_id
            : typeof user?.user_id === 'string' && user.user_id.trim() !== ''
                ? Number(user.user_id)
                : null;

    const userName =
        typeof user?.nickname === 'string' && user.nickname.trim() !== ''
            ? user.nickname
            : user?.name;

    const { sessions: userSessions, loading: userLoading } = useUserGameSessionsViewModel(
        Number.isFinite(numericUserId) ? numericUserId : null
    );

    const loading = generalLoading || (Boolean(user) && userLoading);

    const userStats = Number.isFinite(numericUserId) || userName
        ? calculateUserStats(userSessions, numericUserId ?? '', userName)
        : null;
    const generalStats = calculateGeneralStats(sessions);

    useEffect(() => {
        if (loading || !userStats) return;

        const previous = previousUserStatsRef.current;
        if (previous) {
            if (previous.gamesPlayed !== userStats.gamesPlayed) {
                notifyStatsUpdate('Pelatut pelit', userStats.gamesPlayed);
            }
            if (previous.gamesWonPercentage !== userStats.gamesWonPercentage) {
                notifyStatsUpdate('Voittoprosentti', userStats.gamesWonPercentage);
            }
        }

        previousUserStatsRef.current = {
            gamesPlayed: userStats.gamesPlayed,
            gamesWonPercentage: userStats.gamesWonPercentage,
        };
    }, [loading, userStats, notifyStatsUpdate]);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>Statistiikka</Text>
                <Text style={styles.subtitle}>Tarkastele pelitilastoja ja saavutuksia</Text>
            </View>

            {/* KÄYTTÄJÄN TILASTOT - näytetään jos on kirjautunnut sisään */}
            {user && userStats && (
                <View style={styles.card}>
                    {loading ? (
                        <Text style={styles.statText}>Ladataan...</Text>
                    ) : (
                        <View>
                            <Text style={styles.sectionTitle}>Omat pelitilastot</Text>
                            <Text style={styles.statText}>Pelattujen pelien määrä: {userStats.gamesPlayed}</Text>
                            <Text style={styles.statText}>Voittoprosentti: {userStats.gamesWonPercentage}%</Text>
                            <Text style={styles.statText}>Eniten pelattu peli: {userStats.mostPlayedGame}</Text>
                            <Text style={styles.statText}>Vastustajien lukumäärä: {userStats.opponentsCount}</Text>
                            <StatsCharts userStats={userStats} />
                        </View>
                    )}

                    {/* OMAT PELIKERRAt */}
                    <View style={styles.card}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => navigation.navigate('GameSessions')}
                        >
                            <Text style={styles.buttonText}>Näytä kaikki omat pelikerrat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </ScrollView>
    );
}