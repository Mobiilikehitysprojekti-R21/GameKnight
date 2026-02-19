export type BoardGame = {
  game_id: number
  bgg_id: number
  name: string
  year_published?: number
  rank?: number
  bayes_average?: number
  average?: number
  users_rated?: number
  is_expansion: boolean
  thumbnail_url?: string
};
