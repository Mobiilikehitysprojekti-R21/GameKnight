import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class AddFriend {
    constructor(private repo: FriendRepository) {}

    execute(nickname: string) {
        const trimmed = nickname.trim()
        if (!trimmed) {
            throw new Error("Nickname missing");
        }
        return this.repo.addFriend(trimmed);
    }
}