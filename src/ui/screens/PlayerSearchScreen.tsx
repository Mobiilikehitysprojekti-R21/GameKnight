import { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFriendsViewModel } from "../viewModels/useFriendsViewModel";
import { styles } from "../styles/NewGameStyles";

type RouteParams = {
    onSelect: (user: { id?: string; name: string; type: "USER" | "GUEST" }) => void;
};

export const PlayerSearchScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { friends } = useFriendsViewModel();

    const { onSelect } = route.params as RouteParams;

    const [guestName, setGuestName] = useState("");

    const handleFriendSelect = (friend: any) => {
        onSelect({
            id: friend.id ?? friend.user_id,
            name: friend.nickname,
            type: "USER",
        });

        navigation.goBack();
    };

    const handleGuestAdd = () => {
        if (!guestName.trim()) return;

        onSelect({
            name: guestName.trim(),
            type: "GUEST",
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lisää pelaaja</Text>

            {/* Kaverit */}
            <Text style={styles.sectionTitle}>Kaverit</Text>

            <FlatList
                data={friends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.friendRow}
                        onPress={() => handleFriendSelect(item)}
                    >
                        <Text style={styles.friendName}>
                            {item.nickname}
                        </Text>
                    </Pressable>
                )}
            />

            {/* Vieraspelaaja */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Vieraspelaaja
            </Text>

            <TextInput
                style={styles.locationInput}
                placeholder="Syötä nimi"
                value={guestName}
                onChangeText={setGuestName}
            />

            <Pressable
                style={styles.primaryButton}
                onPress={handleGuestAdd}
            >
                <Text style={styles.primaryButtonText}>
                    Lisää vieraspelaaja
                </Text>
            </Pressable>
        </View>
    );
};
