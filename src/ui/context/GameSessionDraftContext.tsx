import React, { createContext, useContext, useState } from "react";
import type { Location } from "../../domain/entities/Location";
import type { BoardGame } from "../../domain/entities/BoardGame";

type GamePlayer = {
  id?: string;
  name: string;
  type: "USER" | "GUEST";
};

type DraftContextType = {
  selectedGame: BoardGame | null;
  players: GamePlayer[];
  location: Location | null;
  setSelectedGame: React.Dispatch<React.SetStateAction<BoardGame | null>>;
  setPlayers: React.Dispatch<React.SetStateAction<GamePlayer[]>>;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  resetDraft: () => void;
};

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export const GameSessionDraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  const resetDraft = () => {
    setSelectedGame(null);
    setPlayers([]);
    setLocation(null);
  };

  return (
    <DraftContext.Provider
      value={{
        selectedGame,
        players,
        location,
        setSelectedGame,
        setPlayers,
        setLocation,
        resetDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useGameSessionDraft = () => {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useGameSessionDraft must be used inside GameSessionDraftProvider");
  return ctx;
};
