import { UserRepository } from "../domain/repositories/UserRepository";
import axios from "axios";
import { User } from "../domain/entities/User";
import Constants from "expo-constants";

/*
    - UserApiRepository handles HTTP requests to the backend
    - Implements the UserRepository interface from the domain layer
*/


export class UserApiRepository implements UserRepository {

    private apiUrl = Constants.expoConfig?.extra?.API_URL
    
    // Checks if nickname is available
    async validateNickname(nickname: string): Promise<boolean> {
        // Debugging...
        console.log("userapirepo: validoidaan nickia")
        console.log('apiURL: ', this.apiUrl)
        console.log('nicki: ', nickname)

        try {
        //POST request to backend
        const response = await axios.post(`${this.apiUrl}/users/validateNickname`, { nickname })
        
        console.log(response.data)  // debugging...
        // return true, if nickname is available
        // if nickname is unavailable -> backend returns false -> false === true --> return false
        return response.data === true
        } catch (e) {
            console.error("axios error:", e)
            throw e
        }
    }

    // Sign up user and store in the database
    async signUp(user: User): Promise<void> {
        console.log("rekisteröidytään....") // debugging...
        await axios.post(`${this.apiUrl}/users/`, user)
    }
}