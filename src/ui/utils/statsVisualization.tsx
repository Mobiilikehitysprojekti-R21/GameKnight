import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from '../styles/statStyles';
import { colors, spacing, radius } from '../styles/theme';

interface StatsChartsProps {
    userStats?: {
        gamesPlayed: number;
        gamesWonPercentage: number;
        mostPlayedGame: string;
        opponentsCount: number;
    };
    generalStats?: {
        mostPlayedGames: string[];
        gameFrequencies: number[]
        userCount: number;
        groupCount: number;
        mostWinningPlayer: string;
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
                    width={screenWidth -120}
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
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            color: () => colors.textPrimary,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
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