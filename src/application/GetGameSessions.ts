import { GameSessionRepository } from '../domain/repositories/GameSessionRepository';

export class GetGameSessions {
  constructor(private repo: GameSessionRepository) {}

  execute() {
    return this.repo.getSessions()
  }
}
