import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/statStyles';
import { useGameSessionsViewModel } from '../viewModels/useGameSessionsViewModel';
import { useAuthViewModel } from '../viewModels/useAuthViewModel';
import { calculateUserStats, calculateGeneralStats } from '../utils/statsCalculator';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatsCharts } from '../utils/statsVisualization';

type Props = NativeStackScreenProps<RootStackParamList, 'Stats'>;

export default function StatsScreen({ navigation }: Props) {
    const { sessions, loading } = useGameSessionsViewModel();
    const { user } = useAuthViewModel();

    const userStats = user?.sub ? calculateUserStats(sessions, user.sub) : null;
    const generalStats = calculateGeneralStats(sessions);

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

            {/* STATS */}
            <View style={styles.card}>
                {loading ? (
                    <Text style={styles.statText}>Ladataan...</Text>
                ) : (
                    <>
                        {/* YLEISET TILASTOT */}
                        <View>
                            <Text style={styles.sectionTitle}>Yleiset pelitilastot</Text>
                            <Text style={styles.statText}>Käyttäjiä: {generalStats.userCount}</Text>
                            <Text style={styles.statText}>Peliryhmien määrä: {generalStats.groupCount}</Text>
                            <Text style={styles.statText}>Eniten voittanut pelaaja: {generalStats.mostWinningPlayer}</Text>
                            <Text style={styles.statText}>Suosituimmat pelit:</Text>
                            {generalStats.mostPlayedGames.length > 0 ? (
                                generalStats.mostPlayedGames.map((game, idx) => (
                                    <Text key={idx} style={styles.statText}>- {game}</Text>
                                ))
                            ) : (
                                <Text style={styles.statText}>Ei pelejä saatavilla</Text>
                            )}
                        </View>
                        <StatsCharts generalStats={generalStats} />
                    </>
                )}
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