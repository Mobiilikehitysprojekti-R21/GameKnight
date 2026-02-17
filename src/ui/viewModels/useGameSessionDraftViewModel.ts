import { useState } from "react";
import type { Location } from "../../domain/entities/Location";
import type { BoardGame } from "../../domain/entities/BoardGame";

type GamePlayer = {
    id?: string;
    name: string;
    type: "USER" | "GUEST";
};

export const useGameSessionDraftViewModel = () => {
    const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);
    const [players, setPlayers] = useState<GamePlayer[]>([]);
    const [location, setLocation] = useState<Location | null>(null);

    const resetDraft = () => {
        setSelectedGame(null);
        setPlayers([]);
        setLocation(null);
    };

    return {
        selectedGame,
        players,
        location,
        setSelectedGame,
        setPlayers,
        setLocation,
        resetDraft,
    };
};
