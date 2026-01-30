import { FindBoardGames } from "../application/FindBoardGames";

export type RootStackParamList = {
  Home: undefined
  Search: {findBoardGames: FindBoardGames}
  SignUp: undefined
  Profile: undefined
  GameCollection: undefined
  GameSessions: undefined
};
