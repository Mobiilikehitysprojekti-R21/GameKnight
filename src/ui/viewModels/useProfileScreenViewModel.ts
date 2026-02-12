import { useState } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import { useAuth } from "../auth/useAuth";
import { ChangeNickname } from "../../application/ChangeNickname";
import { DeleteUser } from "../../application/DeleteUser";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

// Viewmodel hook for profile screen logic

export const useProfileScreenViewModel = (onSuccess: () => void, onLogout: () => void) => {

    const [nickname, setNickname] = useState("")
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available
    const [showCheck, setShowCheck] = useState(false)               // state to handle user notification text about nickname´s availability

    // Repository and UseCase instances (application)
    const { getAccessToken, logout } = useAuth()
    const repo = new UserApiRepository(getAccessToken)
    const changeNewNickname = new ChangeNickname(repo)
    const deleteUserAccount = new DeleteUser(repo)

    // Function to check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
        setShowCheck(true)  // notify user if nickname is available or not
    }

    // Function to change Nickname
    const changeNick = async () => {
        try {
            const test_auth0id = "auth0ID"  // kovakoodattu testauksen vuoksi, haetaan myöhemmin muistista!!!
            console.log("vm: changeNick:", nickname, test_auth0id)
            await changeNewNickname.execute(nickname, test_auth0id)

            Toast.show({
                type: 'success',
                text1: 'Nimimerkki vaihdettu!',
                text2: `Uusi nimimerkki: ${nickname}`,
                position: 'top',
                visibilityTime: 3000,
            })

            // clear field
            setNickname('')
            onSuccess()     // close modal
        } catch (e: any) {
            console.error("Error changing nickname:", e.message || e)
            // Notify user about error in sign up
            alert(`Virhe nimimerkin vaihdossa: ${e.message || e}`)
        }
    }

    // Function for logout user
    // TODO: logout with auth0???
    const logoutUser = async () => {
        try {
            logout()
            setTimeout(() => {
                onLogout()
            }, 1500)
        } catch (e: any) {
            console.log('Logged out.')
        }
    }

    // Function to delete account
    const deleteUser = async () => {

        const id = await SecureStore.getItemAsync("auth0_id")
        if (!id) {
            alert('Virhe: Auth0 ID:tä ei löytynyt.')
            return
        }
        try {
            await deleteUserAccount.execute(id)
            Toast.show({
                type: 'success',
                text1: 'Tilisi on poistettu',
                text2: `Tervetuloa takaisin!`,
                position: 'top',
                visibilityTime: 3000,
            })
            setTimeout(() => {
                onLogout()
            }, 1500)
            logout()
            onSuccess()
        } catch (e: any) {
            console.log('User delete failed.')
        }
    }

    return {
        nickname,
        setNickname,
        isNickAvailable,
        showCheck,
        checkNickname,
        changeNick,
        //isLoggedIn,
        logoutUser,
        deleteUser
    }

}