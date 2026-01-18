import Session from "../domain/Session";

abstract class SessionRepository {
  abstract save(session: Session): Promise<void>;
  abstract findByID(sessionID: number): Promise<Session | undefined>;
  abstract findByGroupID(groupID: number): Promise<Session[]>;
}

export default SessionRepository;
