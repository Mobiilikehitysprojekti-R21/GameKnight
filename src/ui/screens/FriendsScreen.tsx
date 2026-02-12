import React from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "../styles/friendStyles";
import { useFriendsViewModel } from "../viewModels/useFriendsViewModel";

export default function FriendsScreen() {
    const vm = useFriendsViewModel();
    const previewRequests = vm.incomingRequests;

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Löydä uusia pelikavereita!
                </Text>
                <Text style={styles.subtitle}>
                    Lisää kavereita tai lähetä liittymiskutsu sähköpostilla
                </Text></View>


            {/* Etsi kaveri nicknamella */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Etsi kavereita käyttäjänimellä</Text>
                <TextInput style={styles.inputColumn}
                    value={vm.nickname}
                    onChangeText={vm.setNickname}
                    placeholder="Nimimerkki"
                />
                <TouchableOpacity style={styles.primaryButton}
                    onPress={vm.addFriend}>
                    <Text style={styles.buttonText}>Lähetä kaveripyyntö</Text>
                </TouchableOpacity>

                {/* Palaute */}
                {vm.nicknameError ? (
                    <Text style={styles.statText}>❌ {vm.nicknameError}</Text>
                ) : null}
                {vm.nicknameInfo ? (
                    <Text style={styles.statText}>✅ {vm.nicknameInfo}</Text>
                ) : null}

            </View>


            {/* Invite sähköpostilla */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Kutsu liittymään sähköpostilla</Text>
                <TextInput style={styles.inputColumn}
                    value={vm.email}
                    onChangeText={vm.setEmail}
                    placeholder="Sähköposti"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.primaryButton}
                    onPress={vm.inviteFriend}>
                    <Text style={styles.buttonText}>Lähetä kutsu</Text>
                </TouchableOpacity>

                {/* Palaute */}
                {vm.emailError ? (
                    <Text style={styles.statText}>❌ {vm.emailError}</Text>
                ) : null}
                {vm.emailInfo ? (
                    <Text style={styles.statText}>✅ {vm.emailInfo}</Text>
                ) : null}

            </View>

            {/* Hyväksy kaveripyyntö */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Kaveripyynnöt</Text>
                {vm.incomingRequests.length > 0 ? (
                    <View>
                        {previewRequests.map((r) => {
                            const busy = !!vm.busyRequestIds[r.request_id];
                            return (
                                <View key={r.request_id}>
                                    <Text style={[styles.statText, { fontWeight: "bold" }]}>👤 {r.from_nickname}</Text>

                                    <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
                                        <TouchableOpacity
                                            style={[styles.primaryButton, { flex: 1, opacity: busy ? 0.6 : 1 }]}
                                            disabled={busy}
                                            onPress={() => vm.acceptIncomingRequest(r.request_id)}>
                                            <Text style={styles.buttonText}>Hyväksy</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.deleteButton, { flex: 1, opacity: busy ? 0.6 : 1 }]}
                                            disabled={busy}
                                            onPress={() => vm.declineIncomingRequest(r.request_id)}>
                                            <Text style={styles.buttonText}>Hylkää</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <Text style={styles.statText}>Ei saapuneita pyyntöjä</Text>
                )}
            </View>
        </ScrollView>
    );
}