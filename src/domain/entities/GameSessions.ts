export type GameSession = {
  session_id: number
  game_id: number
  game_name?: string
  played_at: Date
  location_id?: number | null
  location_name?: string | null
  group_id?: number | null
  notes?: string
  players: {
    user_id?: number | null
    name?: string | null
    guest_name?: string | null
    score?: number
    group_id?: number
    is_winner?: boolean
  }[]
}
