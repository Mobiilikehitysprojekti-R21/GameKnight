import { useEffect, useMemo, useState } from "react";
import type { GameSession } from "../../domain/entities/GameSessions";

export function useGameSessionsViewModel() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: korvaa repo/use case -kutsulla
    const mock: GameSession[] = [
      {
        session_id: 1,
        game_id: 101,
        played_at: new Date("2026-01-20"),
        location_id: 10,
        notes: "Uusi lisäosa testissä, toimi hyvin.",
        players: [
          { user_id: "1", score: 92, group_id: 1 },
          { user_id: "2", score: 88, group_id: 1 },
        ],
      },
    ];

    setSessions(mock);
    setLoading(false);
  }, []);

  // Esim. uusimmat ensin
  const sorted = useMemo(() => {
    return [...sessions].sort((a, b) => b.played_at.getTime() - a.played_at.getTime());
  }, [sessions]);

  return { sessions: sorted, loading };
}
