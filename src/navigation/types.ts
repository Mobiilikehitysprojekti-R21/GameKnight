import { FindBoardGames } from "../application/FindBoardGames";

export type RootStackParamList = {
  Home: undefined
  Search: {findBoardGames: FindBoardGames}
  SignUp: undefined
};
