import { BoardGame } from "../domain/entities/BoardGame";

import { BoardGameRepository } from "../domain/repositories/BoardGameRepository";

export class AddGameToCollection {
    constructor(private repo: BoardGameRepository){}

    execute(user_id: string, bgg_id: BoardGame["bgg_id"]) {
        return this.repo.addGameToCollection(user_id, bgg_id)   // add new game to user´s game collection
    }
}