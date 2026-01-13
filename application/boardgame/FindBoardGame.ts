import BoardGame from "../../domain/BoardGame";
import BoardGameRepository from "../../ports/BoardGameRepository";

export interface FindBoardGameInput {
    query: string;
}

class FindBoardGame {
    private readonly boardgameRepository: BoardGameRepository;

    constructor(boardGameRepository: BoardGameRepository)
    {
        this.boardgameRepository = boardGameRepository
    }

    async execute({query}: FindBoardGameInput): Promise<BoardGame[] | undefined> {
        
        if(!query){
            return [];
        }

        return this.boardgameRepository.search(query);
    }
}

export default FindBoardGame;