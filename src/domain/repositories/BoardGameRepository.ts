import { BoardGame } from '../entities/BoardGame';

export interface BoardGameRepository {
  findByName(name: string): Promise<BoardGame[]>;
  addGame(game: BoardGame): Promise<void>
  addGameToCollection(user_id: number, bgg_id: BoardGame["bgg_id"]): Promise<void>
  getGameCollection(user_id: number): Promise<BoardGame[]>
}
