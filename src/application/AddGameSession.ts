import { GameSession } from '../domain/entities/Session';
import { GameSessionRepository } from '../domain/repositories/GameSessionRepository';

export class AddGameSession {
  constructor(private repo: GameSessionRepository) {}

  execute(session: GameSession) {
    return this.repo.addSession(session);
  }
}
