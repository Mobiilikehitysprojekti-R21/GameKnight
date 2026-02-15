import { SessionPlayer } from "../entities/SessionPlayer";

export interface SessionPlayerRepository {
    saveSessionPlayers(session_id: number, players: SessionPlayer[]): Promise<void>
    findBySessionId(session_id: number): Promise<SessionPlayer[]>
    findByUserId(user_id: number): Promise<SessionPlayer[]>

}