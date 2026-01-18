export interface SessionPlayerProps {
  session_id: number;
  user_id: number;
  score?: number;
  is_winner: boolean;
}

class SessionPlayer {
  public readonly session_id: number;
  public readonly user_id: number;
  public readonly score?: number;
  public readonly is_winner: boolean;

  constructor({ session_id, user_id, score, is_winner }: SessionPlayerProps) {
    this.session_id = session_id;
    this.user_id = user_id;
    this.score = score;
    this.is_winner = is_winner;
  }
}

export default SessionPlayer;
