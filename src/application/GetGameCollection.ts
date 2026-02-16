import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class GetGameCollection {
  constructor(private repo: BoardGameRepository) {}

  execute(user_id: string) {
    return this.repo.getGameCollection(user_id)   // get user´s game collection by user_id
  }
}