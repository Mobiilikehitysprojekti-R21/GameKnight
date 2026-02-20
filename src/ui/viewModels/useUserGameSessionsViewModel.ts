import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { GameSession } from "../../domain/entities/GameSessions";
import { GameSessionsApiRepository } from "../../infrastructure/api/GameSessionsApiRepository";
import { useAuth } from "../auth/useAuth";

export function useUserGameSessionsViewModel(userId: number | null) {
    const [sessions, setSessions] = useState<GameSession[]>([]);
    const [loading, setLoading] = useState(false);
    const { getAccessToken, user } = useAuth();

    const fetchUserSessions = useCallback(() => {
        if (typeof userId !== "number" || !Number.isFinite(userId)) {
            setSessions([]);
            setLoading(false);
            return;
        }

        const safeUserId = userId;
        const currentUserNickname = user?.nickname || "";
        setLoading(true);
        const repo = new GameSessionsApiRepository(getAccessToken);
        repo.getSessions()
            .then((data: any[]) => {
                const mappedSessions = data.map((session) => ({
                    ...session,
                    played_at: new Date(session.played_at),
                }));
                const filteredSessions = mappedSessions.filter((session) =>
                    session.players?.some((player: any) => {
                        // Check if user is a registered player
                        const playerId = typeof player.user_id === "number"
                            ? player.user_id
                            : typeof player.user_id === "string" && player.user_id.trim() !== ""
                                ? Number(player.user_id)
                                : null;
                        const isRegisteredPlayer = Number.isFinite(playerId) && playerId === safeUserId;
                        
                        // Check if user participated as a guest
                        const isGuest = player.guest_name && player.guest_name === currentUserNickname;
                        
                        return isRegisteredPlayer || isGuest;
                    })
                );
                setSessions(filteredSessions);
            })
            .catch(() => setSessions([]))
            .finally(() => setLoading(false));
    }, [getAccessToken, userId, user?.nickname]);

    useFocusEffect(
        useCallback(() => {
            fetchUserSessions();
        }, [fetchUserSessions])
    );

    const sorted = useMemo(() => {
        return [...sessions].sort((a, b) => b.played_at.getTime() - a.played_at.getTime());
    }, [sessions]);

    return { sessions: sorted, loading };
}
