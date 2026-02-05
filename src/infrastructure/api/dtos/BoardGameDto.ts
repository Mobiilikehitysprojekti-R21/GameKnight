/*Data Transfer Object
    rakenne vastaa täysin API:n rakennetta
*/

export type BoardGameDto = {
  
  bgg_id: number
  name: string
  is_expansion: boolean
  game_id: number
  year_published: number
  rank: number
  bayes_average: number
  average: number
  users_rated: number
  
}
