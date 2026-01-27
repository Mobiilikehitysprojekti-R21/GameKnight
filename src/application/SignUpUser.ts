import { UserRepository } from "../domain/repositories/UserRepository";
import { User, validateUser } from "../domain/entities/User";

/*
    SignUpUser is an application-level UseCase
    It coordinates domain logic and repository actions
*/

export class SignUpUser {
    constructor(private repo: UserRepository) {}

    // Execute sign up process
    async execute(user: User) {
        validateUser(user)              // Check if inputs are filled correctly -> validates user entity
        await this.repo.signUp(user)    // sign up user, save user in the database
    }
}