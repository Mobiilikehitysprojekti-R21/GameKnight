import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class GetGameCollection {
  constructor(private repo: BoardGameRepository) {}

  execute(user_id: number) {
    return this.repo.getGameCollection(user_id)
  }
}