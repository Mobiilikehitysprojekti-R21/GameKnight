import { GameSession } from '../entities/GameSessions';

export interface GameSessionRepository {
  getSessions(): Promise<GameSession[]>
  addSession(session: GameSession): Promise<void>
}
