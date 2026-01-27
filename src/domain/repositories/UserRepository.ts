import { User } from "../entities/User";

/*
    UserRepository is domain-level interface
    It defines operations related to users
*/

export interface UserRepository {
    validateNickname(nickname: string): Promise<boolean>    // checks if nickname is available
    signUp(user: User): Promise<void>                       // Registers a new user
    changeNickname(nickname: string): Promise<void>         // change nickname

}