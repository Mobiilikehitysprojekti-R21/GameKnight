import { useState } from "react";
import { UserApiRepository } from "../../infrastructure/UserApiRepository";
import { SignUpUser } from "../../application/SignUpUser";

export const useSignUpViewModel = (onSuccess: () => void) => {
    
    const [email, setEmail] = useState("")                          // state for email
    //const [auth0_id, setAuth0_id] = useState("")                  // state for auth0 id
    const [nickname, setNickname] = useState("")                    // state for nickname
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available

    // Repository and UseCase instances (application)
    const repo = new UserApiRepository()
    const signUpUser = new SignUpUser(repo)

    // Function to check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
    }

    // 
    const submit = async () => {

        try {
            // Execute signUp UseCase
            await signUpUser.execute({ email, nickname })   // later needs auth0 email & auth0_id
            // clear all fields
            setEmail('')
            setNickname('')

            onSuccess()     // Notify parent component of success
        } catch (error: any) {
            console.error("SignUp error:", error.message || error)
            // Notify user about error in sign up
            alert(`Virhe tilin luomisessa: ${error.message || error}`)
        }
        
    }

    return {
        email,
        nickname,
        isNickAvailable,
        setEmail,
        setNickname,
        checkNickname,
        submit
    }
}