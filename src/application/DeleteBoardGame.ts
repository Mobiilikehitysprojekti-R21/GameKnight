import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class DeleteBoardGame {
    constructor(private repo: BoardGameRepository) {}

    async execute(bgg_id: number, auth0_id: string) {
        await this.repo.deleteBoardGame(bgg_id, auth0_id)
    }
}