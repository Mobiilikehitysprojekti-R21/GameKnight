import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class AddFriend {
    constructor(private repo: FriendRepository) {}

    execute(user_id: number, nickname: string) {
        const trimmed = nickname.trim()
        if (!trimmed) {
            throw new Error("Nickname missing");
        }
        return this.repo.addFriend(user_id, trimmed);
    }
}