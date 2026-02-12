import { FindBoardGames } from "../application/FindBoardGames";

export type RootStackParamList = {
  Home: undefined
  Search: { findBoardGames: FindBoardGames }
  SignUp: undefined
  Profile: undefined
  GameCollection: undefined
  GameSessions: undefined

  NewGame: undefined
  MapScreen: undefined;
  Friends: undefined
  PlayerSearch: {
    onSelect: (user: { id?: string; name: string; type: "USER" | "GUEST" }) => void;
  };

};
