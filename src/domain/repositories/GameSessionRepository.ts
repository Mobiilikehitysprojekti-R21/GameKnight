import { GameSession } from '../entities/GameSessions';

export interface GameSessionRepository {
  getSessions(): Promise<GameSession[]>
  getSessionsByUserId(user_id: number): Promise<GameSession[]> 
  getSessionById(session_id: number): Promise<GameSession | undefined> 
  createSession(input: GameSession): Promise<GameSession>
  updateSession(session_id: number, patch: Partial<GameSession>): Promise<void>  // Partial for optional fields
  addLocation(session_id: number, location_id: number): Promise<void>
}