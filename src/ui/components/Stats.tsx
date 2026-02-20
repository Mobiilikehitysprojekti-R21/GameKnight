import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/statStyles';

interface GeneralStatsProps {
    mostPlayedGames: string[];
    userCount: number;
    groupCount: number;
    mostWinningPlayer: string;
    totalGamesCount: number;
}

interface UserStatsProps {
    gamesPlayed: number;
    gamesWonPercentage: number;
    mostPlayedGame: string;
    opponentsCount: number;
}

interface StatsProps {
    loggedIn: boolean;
    generalStats: GeneralStatsProps;
    userStats?: UserStatsProps;
}

export const Stats: React.FC<StatsProps> = ({ loggedIn, generalStats, userStats }) => (
    <View>
        {loggedIn && userStats ? (
            <>
                <Text style={styles.sectionTitle}>Omat pelitilastot</Text>
                <Text style={styles.statText}>Pelattujen pelien määrä: {userStats.gamesPlayed}</Text>
                <Text style={styles.statText}>Voittoprosentti: {userStats.gamesWonPercentage}</Text>
                <Text style={styles.statText}>Eniten pelattu peli: {userStats.mostPlayedGame}</Text>
                <Text style={styles.statText}>Vastustajien lukumäärä: {userStats.opponentsCount}</Text>
            </>
        ) : (
            <>
                <Text style={styles.sectionTitle}>Yleiset pelitilastot</Text>
                <Text style={styles.statText}>Käyttäjiä: {generalStats.userCount}</Text>
                <Text style={styles.statText}>Pelattujen pelien määrä: {generalStats.totalGamesCount}</Text>
                <Text style={styles.statText}>Eniten voittanut pelaaja: {generalStats.mostWinningPlayer}</Text>
                <Text style={styles.statText}>Suosituimmat pelit:</Text>
                {generalStats.mostPlayedGames.map((game, idx) => (
                    <Text key={idx} style={styles.statText}>- {game}</Text>

                ))}
            </>
        )}
    </View>
);
