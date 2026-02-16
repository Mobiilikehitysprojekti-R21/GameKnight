import { useEffect, useMemo, useState } from "react";
import type { GameSession } from "../../domain/entities/GameSessions";
import { GameSessionsApiRepository } from "../../infrastructure/api/GameSessionsApiRepository";

export function useGameSessionsViewModel() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repo = new GameSessionsApiRepository();
    repo.getSessions()
      .then((data: any[]) => {
        // muttaa played_at -> Date
        const sessions = data.map((session) => ({
          ...session,
          played_at: new Date(session.played_at),
        }));
        setSessions(sessions);
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  // uusimmat ensin
  const sorted = useMemo(() => {
    return [...sessions].sort((a, b) => b.played_at.getTime() - a.played_at.getTime());
  }, [sessions]);

  return { sessions: sorted, loading };
}
