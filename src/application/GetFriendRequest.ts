import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class GetFriendRequests {
    constructor(private repo: FriendRepository) { }

    execute() {
        return this.repo.getFriendRequests();
    }
}