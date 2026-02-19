import { User } from "../entities/User";

/*
    UserRepository is domain-level interface
    It defines operations related to users
*/

export interface UserRepository {
    validateNickname(nickname: string): Promise<boolean>    // checks if nickname is available
    signUp(user: User): Promise<void>                       // Registers a new user
    signIn(user: User): Promise<void>                       // Sign in user
    changeNickname(nickname: string, auth0_id: string): Promise<void>         // change nickname
    deleteUser(auth0_id: string): Promise<void>         // delete user
    fetchUser(auth0_id: string): Promise<User | null>  // fetch user info
}