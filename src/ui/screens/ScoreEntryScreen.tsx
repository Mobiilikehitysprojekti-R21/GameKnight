import { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/ScoreEntryStyles";
import { useGameSessionDraft } from "../context/GameSessionDraftContext";
import { useSessionNotifications } from "../viewModels/useSessionNotifications";
import { useAuth } from "../auth/useAuth";
import { GameSessionsApiRepository } from "../../infrastructure/api/GameSessionsApiRepository";

export const ScoreEntryScreen = () => {
    const { selectedGame, players, location } = useGameSessionDraft();
    const navigation = useNavigation<any>();
    const { notifySessionInvite } = useSessionNotifications();
    const { getAccessToken } = useAuth();
    const sessionRepo = new GameSessionsApiRepository(getAccessToken);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (isSaving || isSaved) return;

        if (!selectedGame?.game_id) {
            Alert.alert("Tallennus epäonnistui", "Peliä ei ole valittu.");
            return;
        }

        if (rankedPlayers.length === 0) {
            Alert.alert("Tallennus epäonnistui", "Pelaajia ei löytynyt.");
            return;
        }

        setIsSaving(true);

        try {
            const resultPayload = {
                game_id: selectedGame.game_id,
                game_name: selectedGame.name,
                played_at: new Date(),
                location_id: null,
                location_name: location?.label || null,
                notes: notes || null,
                players: rankedPlayers.map(p => ({
                    user_id: p.type === "USER" ? (p.id as unknown as number) : null,
                    name: p.name,
                    guest_name: p.type === "GUEST" ? p.name : null,
                    score: p.score,
                    is_winner: p.rank === 1,
                })),
            };

            const savedSession = await sessionRepo.createSession(resultPayload);
            setIsSaved(true);
            // ilmoita lisätyille kaverille (vain rekisteröityneet)
            if (savedSession?.session_id) {
                for (const player of players) {
                    if (player.type === "USER" && player.id) {
                        await notifySessionInvite(player.id, savedSession.session_id);
                    }
                }
            }
        } catch (error) {
            console.error("Saving game session failed:", error);
            Alert.alert("Tallennus epäonnistui", "Pelin tallennus ei onnistunut. Tarkista yhteys tai palvelin.");
        } finally {
            setIsSaving(false);
        }
    };

    const [scores, setScores] = useState(
        players.map((p: any) => ({
            ...p,
            score: 0,
        }))
    );

    const [notes, setNotes] = useState('');

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

            {isSaved && winner && (
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
                            isSaved && rankInfo?.rank === 1 && styles.winnerRow,
                        ]}
                    >
                        <View>
                            <Text style={styles.playerName}>{player.name}</Text>
                            {isSaved && rankInfo && (
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

            {/* NOTES INPUT */}
            {!isSaved && (
                <View style={styles.playerRow}>
                    <Text style={styles.playerName}>Muistiinpanot</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Lisää muistiinpanot..."
                        placeholderTextColor="#94A3B8"
                        value={notes}
                        onChangeText={setNotes}
                        editable={!isSaved}
                    />
                </View>
            )}

            <Pressable style={styles.saveButton} onPress={handleSave} disabled={isSaved || isSaving}>
                <Text style={[styles.saveButtonText]}>
                    {isSaving ? "Tallennetaan..." : isSaved ? "Peli tallennettu!" : "Tallenna peli"}
                </Text>
            </Pressable>

            {isSaved && (
                <Pressable style={styles.saveButton} onPress={() => navigation.navigate("GameSessions")}>
                    <Text style={styles.saveButtonText}>Siirry pelisessioihin</Text>
                </Pressable>
            )}

        </ScrollView>
    );
};