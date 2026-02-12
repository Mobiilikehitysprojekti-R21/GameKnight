import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class DeleteBoardGame {
    constructor(private repo: BoardGameRepository) {}

    async execute(bgg_id: number) {
        await this.repo.deleteBoardGame(bgg_id)
    }
}