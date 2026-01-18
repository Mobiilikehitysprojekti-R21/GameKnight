import SessionRepository from "../../ports/SessionRepository";
import Session from "../../domain/Session";

class InMemorySessionRepository extends SessionRepository {
  private readonly sessions: Session[] = [];

  async save(session: Session): Promise<void> {
    this.sessions.push(session);
  }

  async findByID(sessionID: number): Promise<Session | undefined> {
    return this.sessions.find(s => s.session_id === sessionID);
  }

  async findByGroupID(groupID: number): Promise<Session[]> {
    return this.sessions.filter(s => s.group_id === groupID);
  }
}

export default InMemorySessionRepository;
