import { UserRepository } from "../domain/repositories/UserRepository";


export class FetchUser {
    constructor(private repo: UserRepository) {}

    // Execute fetchin user data from db
    async execute(auth0_id: string) {
        await this.repo.fetchUser(auth0_id)
        
    }
}