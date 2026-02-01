import { UserRepository } from "../domain/repositories/UserRepository";
import { User, validateUser } from "../domain/entities/User";


export class ChangeNickname {
    constructor(private repo: UserRepository) {}

    // Execute nickname change 
    async execute(nickname: string, auth0_id: string) {
        await this.repo.changeNickname(nickname, auth0_id)   // save new nickname in the database
    }
}