export interface BoardGameProps {
    id: number,
    name: string,
    yearpublished: number,
    rank: number,
    bayesaverage: number,
    average: number,
    usersrated: number,
    is_expansion: boolean,
    // abstracts_rank: number: number,
    // cgs_rank: numer: number,
    // childrensgames_rank: number,
    // familygames_rank: number,
    // partygames_rank: number,
    // strategygames_rank: number,
    // thematic_rank: number,
    // wargames_rank: number,
}

class BoardGame implements BoardGameProps {
    constructor (
    public readonly id: number,
    public readonly name: string,
    public readonly yearpublished: number,
    public readonly rank: number,
    public readonly bayesaverage: number,
    public readonly average: number,
    public readonly usersrated: number,
    public readonly is_expansion: boolean,
    ) {
        
    }
}

export default BoardGame;