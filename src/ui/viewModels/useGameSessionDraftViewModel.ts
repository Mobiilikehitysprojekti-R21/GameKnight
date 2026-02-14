import { useState } from "react";
import type { Location } from "../../domain/entities/Location";
import type { BoardGame } from "../../domain/entities/BoardGame";

type GamePlayer = {
    id?: string;
    name: string;
    type: "USER" | "GUEST";
};

let draftState: {
    selectedGame: BoardGame | null;
    players: GamePlayer[];
    location: Location | null;
} = {
    selectedGame: null,
    players: [],
    location: null,
};

export const useGameSessionDraftViewModel = () => {
    const [, forceUpdate] = useState({});

    const setSelectedGame = (game: BoardGame | null) => {
        draftState.selectedGame = game;
        forceUpdate({});
    };

    const setPlayers = (updater: GamePlayer[] | ((prev: GamePlayer[]) => GamePlayer[])) => {
        if (typeof updater === "function") {
            draftState.players = updater(draftState.players);
        } else {
            draftState.players = updater;
        }
        forceUpdate({});
    };

    const setLocation = (location: Location | null) => {
        draftState.location = location;
        forceUpdate({});
    };

    const resetDraft = () => {
        draftState = {
            selectedGame: null,
            players: [],
            location: null,
        };
        forceUpdate({});
    };

    return {
        selectedGame: draftState.selectedGame,
        players: draftState.players,
        location: draftState.location,
        setSelectedGame,
        setPlayers,
        setLocation,
        resetDraft,
    };
};
