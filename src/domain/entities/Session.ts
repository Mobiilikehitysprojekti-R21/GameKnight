export type GameSession = {
  session_id: number
  group_id?: number | null
  game_id: number
  played_at: Date
  location_id?: number | null
  notes?: string
  players: {
    user_id: string
    score?: number
    group_id?: number | null
  }[]
}