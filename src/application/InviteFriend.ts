import type { FriendRepository } from "../domain/repositories/FriendRepository";

export class InviteFriend {
    constructor(private repo: FriendRepository) {}
    execute(email: string) {
        const trimmed = email.trim()
        if (!trimmed) {
            throw new Error("Sähköposti puuttuu");
        }
        if (!trimmed.includes("@")) {
            throw new Error("Virheellinen sähköpostiosoite");
        }
        return this.repo.inviteFriend(trimmed);
    }
}