import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class GetFriends {
    constructor(private repo: FriendRepository) {}

    execute() {
        return this.repo.getFriends();
    }
}