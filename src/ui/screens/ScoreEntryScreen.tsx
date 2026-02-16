import { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../styles/ScoreEntryStyles"; 
import { useGameSessionDraftViewModel } from "../viewModels/useGameSessionDraftViewModel";

export const ScoreEntryScreen = () => {
    const { selectedGame, players, location } = useGameSessionDraftViewModel();
    const navigation = useNavigation<any>();

    const handleSave = async () => {
        const resultPayload = {
            game_id: selectedGame?.game_id,
            played_at: new Date(),
            players: rankedPlayers.map(p => ({
                user_id: p.id ?? null,
                score: p.score,
            })),
        };

        console.log("Saving result:", resultPayload);

        navigation.navigate("GameSessions");
    };

    const [scores, setScores] = useState(
        players.map((p: any) => ({
            ...p,
            score: 0,
        }))
    );

    const updateScore = (index: number, value: string) => {
        const numeric = parseInt(value) || 0;

        setScores((prev: typeof scores) => {
            const copy = [...prev];
            copy[index].score = numeric;
            return copy;
        });
    };

    const rankedPlayers = useMemo(() => {
        return [...scores]
            .sort((a, b) => b.score - a.score)
            .map((player, index) => ({
                ...player,
                rank: index + 1,
            }));
    }, [scores]);

    const winner = rankedPlayers[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{selectedGame?.name}</Text>

            {winner && (
                <View style={styles.winnerBanner}>
                    <Text style={styles.winnerText}>
                        🏆 Voittaja: {winner.name}
                    </Text>
                </View>
            )}

            {scores.map((player: any, index: number) => {
                const rankInfo = rankedPlayers.find(p => p.name === player.name);

                return (
                    <View
                        key={index}
                        style={[
                            styles.playerRow,
                            rankInfo?.rank === 1 && styles.winnerRow,
                        ]}
                    >
                        <View>
                            <Text style={styles.playerName}>{player.name}</Text>
                            {rankInfo && (
                                <Text style={styles.rank}>
                                    Sijoitus: {rankInfo.rank}
                                </Text>
                            )}
                        </View>

                        <TextInput
                            style={styles.scoreInput}
                            keyboardType="numeric"
                            value={player.score.toString()}
                            onChangeText={(value) => updateScore(index, value)}
                        />
                    </View>

                );
            })}

            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Tallenna peli</Text>
            </Pressable>

        </ScrollView>
    );
};