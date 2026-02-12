import { BoardGame } from '../../../domain/entities/BoardGame'
import { BoardGameDto } from '../dtos/BoardGameDto'

/*structure is altered for better usage*/

export const mapDtoToBoardGame = (dto: BoardGameDto): BoardGame => ({
  game_id: dto.game_id,
  bgg_id: dto.bgg_id,
  name: dto.name,
  year_published: dto.year_published,
  rank: dto.rank,
  bayes_average: dto.bayes_average,
  average: dto.average,
  users_rated: dto.users_rated,
  is_expansion: dto.is_expansion,
})