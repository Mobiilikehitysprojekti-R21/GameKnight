import { UserRepository } from "../domain/repositories/UserRepository";
import { User, validateUser } from "../domain/entities/User";

/*
    SignInUser is an application-level UseCase
    It coordinates domain logic and repository actions
*/

export class SignInUser {
    constructor(private repo: UserRepository) {}

    // Execute sign up process
    async execute(user: User) {
        validateUser(user)              // Check if inputs are filled correctly -> validates user entity
        await this.repo.signIn(user)    // sign up user, save user in the database
    }
}