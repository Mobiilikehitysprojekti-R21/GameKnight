import { useCallback, useEffect, useMemo, useState } from "react";
import type { GameSession } from "../../domain/entities/GameSessions";
import { GameSessionsApiRepository } from "../../infrastructure/api/GameSessionsApiRepository";
import { useAuth } from "../auth/useAuth";

export function useGameSessionsViewModel() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAccessToken } = useAuth();

  const fetchSessions = useCallback(() => {
    setLoading(true);
    const repo = new GameSessionsApiRepository(getAccessToken);
    repo.getSessions()
      .then((data: any[]) => {
        // muuta played_at -> Date
        const sessions = data.map((session) => ({
          ...session,
          played_at: new Date(session.played_at),
        }));
        setSessions(sessions);
      })
      .catch((error) => {
        console.error("Failed to load sessions:", error);
        setSessions([]);
      })
      .finally(() => setLoading(false));
  }, [getAccessToken]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // uusimmat ensin
  const sorted = useMemo(() => {
    return [...sessions].sort((a, b) => b.played_at.getTime() - a.played_at.getTime());
  }, [sessions]);

  return { sessions: sorted, loading };
}
