export interface SessionProps {
  session_id: number;
  group_id: number;
  game_id: number;
  played_at: Date;
  location_id?: number;
  notes?: string;
}

class Session {
  public readonly session_id: number;
  public readonly group_id: number;
  public readonly game_id: number;
  public readonly played_at: Date;
  public readonly location_id?: number;
  public readonly notes?: string;

  constructor({ session_id, group_id, game_id, played_at, location_id, notes }: SessionProps) {
    this.session_id = session_id;
    this.group_id = group_id;
    this.game_id = game_id;
    this.played_at = played_at;
    this.location_id = location_id;
    this.notes = notes;
  }
}

export default Session;
