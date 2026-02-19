import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/NewGameStyles";
import { useGameSessionDraft } from "../context/GameSessionDraftContext";

export const PlayerSearchScreen = () => {
    const navigation = useNavigation<any>();
    const { setPlayers } = useGameSessionDraft();

    const [guestName, setGuestName] = useState("");

    const handleGuestAdd = () => {
        if (!guestName.trim()) return;

        const newPlayer = {
            id: `guest-${Date.now()}-${Math.random()}`,
            name: guestName.trim(),
            type: "GUEST" as const,
        };

        setPlayers(prev => [...prev, newPlayer]);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lisää vieraspelaaja</Text>

            {/* Vieraspelaaja */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Vieraspelaaja
            </Text>

            <TextInput
                style={styles.inputColumn}
                placeholder="Syötä nimi"
                value={guestName}
                onChangeText={setGuestName}
            />

            <Pressable
                style={styles.primaryButton}
                onPress={handleGuestAdd}
            >
                <Text style={styles.primaryButtonText}>
                    Lisää
                </Text>
            </Pressable>
        </View>
    );
};