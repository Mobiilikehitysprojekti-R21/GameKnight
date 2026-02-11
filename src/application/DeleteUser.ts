import { UserRepository } from "../domain/repositories/UserRepository";

export class DeleteUser {
    constructor(private repo: UserRepository) {}

    async execute(auth0_id: string) {
        await this.repo.deleteUser(auth0_id)
    }
}