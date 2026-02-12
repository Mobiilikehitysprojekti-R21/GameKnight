import { BoardGame } from '../entities/BoardGame';

export interface BoardGameRepository {
  findByName(name: string): Promise<BoardGame[]>;           // find boardgames from db by name
  addGame(game: BoardGame): Promise<void>                   // TODO: add game to database
  addGameToCollection(auth0_id: string, bgg_id: BoardGame["bgg_id"]): Promise<void>  // add game to user´s collection
  getGameCollection(user_id: string): Promise<BoardGame[]>    // get user´s game collection
  deleteBoardGame(bgg_id: number, auth0_id: string): Promise<void>
}
