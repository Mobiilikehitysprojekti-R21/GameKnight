import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { GameSession } from "../../domain/entities/GameSessions";
import { GameSessionsApiRepository } from "../../infrastructure/api/GameSessionsApiRepository";

export function useGameSessionsViewModel() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(() => {
    setLoading(true);
    const repo = new GameSessionsApiRepository();
    repo.getSessions()
      .then((data: any[]) => {
        // muuta played_at -> Date
        const sessions = data.map((session) => ({
          ...session,
          played_at: new Date(session.played_at),
        }));
        setSessions(sessions);
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSessions();
    }, [fetchSessions])
  );

  // uusimmat ensin
  const sorted = useMemo(() => {
    return [...sessions].sort((a, b) => b.played_at.getTime() - a.played_at.getTime());
  }, [sessions]);

  return { sessions: sorted, loading };
}
