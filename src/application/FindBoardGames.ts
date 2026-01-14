import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class FindBoardGames {
  constructor(private repo: BoardGameRepository) {}

  async execute(query: string) {
    if (!query.trim()) return [];
    return this.repo.findByName(query);
  }
}
