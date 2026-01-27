import { UserRepository } from "../domain/repositories/UserRepository";
import { User, validateUser } from "../domain/entities/User";

/*
    SignUpUser is an application-level UseCase
    It coordinates domain logic and repository actions
*/

export class ChangeNickname {
    constructor(private repo: UserRepository) {}

    // Execute sign up process
    async execute(nickname: string) {
        await this.repo.changeNickname(nickname)   // save new nickname in the database
    }
}