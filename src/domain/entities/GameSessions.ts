export type SessionPlayer = {
  user_id: number;
  score?: number;
  is_winner?: boolean;
};

export type GameSession = {
  session_id: number
  game_id: number
  played_at: Date
  location_id?: number | null
  group_id?: number | null
  notes?: string
  players: {
    user_id: string
    score?: number
    group_id?: number
  }[]
}
