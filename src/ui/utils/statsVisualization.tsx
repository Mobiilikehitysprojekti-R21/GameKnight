import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from '../styles/statStyles';
import { colors, spacing, radius } from '../styles/theme';

interface StatsChartsProps {
    userStats?: {
        gamesPlayed: number;
        gamesWonPercentage: number;
        mostPlayedGame: string;
        opponentsCount: number;
        opponentStats?: { [key: string]: number };
    };
    generalStats?: {
        mostPlayedGames: string[];
        gameFrequencies: number[]
        userCount: number;
        groupCount: number;
        mostWinningPlayer: string;
        totalGamesCount: number;
    };
}

export const StatsCharts: React.FC<StatsChartsProps> = ({ userStats, generalStats }) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <View>

            {/* SUOSITUIMMAT PELIT BAR CHART */}
            {generalStats && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Suosituimmat pelit</Text>
                    <BarChart
                        data={{
                            labels: generalStats.mostPlayedGames.slice(0, 5).map((g) => `Game ${g}`) || [],
                            datasets: [
                                {
                                    data: generalStats.gameFrequencies.length > 0
                                        ? generalStats.gameFrequencies
                                        : [0], // jos ei dataa, näytä 0
                                },
                            ],
                        }}
                        width={screenWidth - 120}
                        height={220}
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: () => colors.primary,
                            labelColor: () => colors.textPrimary,
                        }}
                        verticalLabelRotation={30}
                        yAxisLabel=""
                        yAxisSuffix=""
                    />
                </View>
            )}

            {/* Voitot vastustajittain pylväsdiagrammina */}
            {userStats?.opponentStats && Object.keys(userStats.opponentStats).length > 0 ? (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Voitot ystäviä vastaan</Text>
                    {(() => {
                        const opponentEntries = Object.entries(userStats.opponentStats)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5);

                        const maxWins = Math.max(...opponentEntries.map(([_, w]) => w), 1);

                        return (
                            <View>
                                {opponentEntries.map(([opponent, wins], idx) => {
                                    const percentage = (wins / maxWins) * 100;
                                    return (
                                        <View key={idx} style={{ marginVertical: 8 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Text style={[styles.statText, { fontSize: 12 }]}>{opponent}</Text>
                                                <Text style={[styles.statText, { fontSize: 12 }]}>{wins}</Text>
                                            </View>
                                            <View style={{
                                                height: 24,
                                                backgroundColor: colors.surface,
                                                borderRadius: 4,
                                                overflow: 'hidden',
                                            }}>
                                                <View style={{
                                                    height: '100%',
                                                    width: `${percentage}%`,
                                                    backgroundColor: colors.primary,
                                                    borderRadius: 4,
                                                }} />
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })()}
                </View>
            ) : null}

            {/* voittoprosentti piirakkakuvaajana */}
            {userStats && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Voittoprosentti</Text>
                    <PieChart
                        data={[
                            {
                                name: 'Voitot',
                                population: userStats.gamesWonPercentage,
                                color: colors.primary,
                                legendFontColor: colors.textPrimary,
                            },
                            {
                                name: 'Häviöt',
                                population: 100 - userStats.gamesWonPercentage,
                                color: colors.danger,
                                legendFontColor: colors.textPrimary,
                            },
                        ]}
                        width={screenWidth - 120}
                        height={220}
                        hasLegend={false}
                        center={[70, 0]}
                        style={{ alignSelf: 'center' }}
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: () => colors.textPrimary,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="0"
                    />
                    <View style={styles.chartLegendRow}>
                        <View style={styles.chartLegendItem}>
                            <View style={[styles.chartLegendSwatch, { backgroundColor: colors.primary }]} />
                            <Text style={styles.chartLegendText}>Voitot</Text>
                        </View>
                        <View style={styles.chartLegendItem}>
                            <View style={[styles.chartLegendSwatch, { backgroundColor: colors.danger }]} />
                            <Text style={styles.chartLegendText}>Häviöt</Text>
                        </View>
                    </View>
                </View>
            )}


            {/* pelatut pelit viivakaaviona */}
            {userStats && (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Pelatut pelit</Text>
                    <LineChart
                        data={{
                            labels: ['', ''],
                            datasets: [
                                {
                                    data: [0, userStats.gamesPlayed],
                                },
                            ],
                        }}
                        width={screenWidth - 120}
                        height={250}
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: () => colors.primary,
                            labelColor: () => colors.textPrimary,
                        }}
                    />
                </View>
            )}
        </View>
    );
};