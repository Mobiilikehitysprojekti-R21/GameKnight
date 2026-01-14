import { BoardGame } from "../entities/BoardGame";

export interface BoardGameRepository {
  findByName(name: string): Promise<BoardGame[]>;
}
