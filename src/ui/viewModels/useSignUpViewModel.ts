import { useState } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import { SignUpUser } from "../../application/SignUpUser";
import { SignInUser } from "../../application/SignInUser";
import { useAuth } from "../auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSignUpViewModel = (onSuccess: () => void) => {

    const { login, getAccessToken } = useAuth()


    const [email, setEmail] = useState("")                          // state for email
    //const [auth0_id, setAuth0_id] = useState("")                  // state for auth0 id
    const [nickname, setNickname] = useState("")                    // state for nickname
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available
    const [showCheck, setShowCheck] = useState(false)               // state to handle user notification text about nickname´s availability

    // Repository and UseCase instances (application)
    const repo = new UserApiRepository(getAccessToken)
    const signUpUser = new SignUpUser(repo)
    const signInUser = new SignInUser(repo)

    // Function to check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
        setShowCheck(true)  // notify user if nickname is available or not
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

    const signIn = async () => {
        try {
            await signInUser.execute({ email, nickname })
            //login()
            onSuccess()
        } catch (e: any) {
            console.error("SignIn error:", e.message || e)
            // Notify user about error in sign up
            alert(`Virhe sisäänkirjautumisessa: ${e.message || e}`)
        }
    }

    return {
        email,
        nickname,
        isNickAvailable,
        showCheck,
        setEmail,
        setNickname,
        checkNickname,
        submit,
        signIn,

    }
}