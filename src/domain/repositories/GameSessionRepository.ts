import { GameSession } from '../entities/Session';

export interface GameSessionRepository {
  getSessions(): Promise<GameSession[]>
  addSession(session: GameSession): Promise<void>
}
