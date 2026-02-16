import { useState, useEffect } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import { useAuth } from "../auth/useAuth";
import { ChangeNickname } from "../../application/ChangeNickname";
import { DeleteUser } from "../../application/DeleteUser";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pickImageFromGallery } from "../services/imageService";

// Viewmodel hook for profile screen logic

export const useProfileScreenViewModel = (onSuccess: () => void, onLogout: () => void) => {

    const [nickname, setNickname] = useState("")
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available
    const [showCheck, setShowCheck] = useState(false)               // state to handle user notification text about nickname´s availability

    // Image
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // user
    const [userNickname, setUserNickname] = useState<string | null>(null)
    const [auth0_id, setAuth0_id] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    // Repository and UseCase instances (application)
    const auth = useAuth()
    const repo = new UserApiRepository(auth.getAccessToken)
    const changeNewNickname = new ChangeNickname(repo)
    const deleteUserAccount = new DeleteUser(repo)

    // Function to check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
        setShowCheck(true)  // notify user if nickname is available or not
    }

    //  fetch user info when the ViewModel is mounted
    useEffect(() => {
        setUserNickname(auth.user?.nickname ?? null)
        setAuth0_id(auth.user?.sub ?? null)
        setEmail(auth.user?.email ?? null)
        console.log("ProfileVM: ", auth.user.nickname, auth.user.auth0_id, auth.user.email)
    }, [])

    // Function to change Nickname
    const changeNick = async () => {
        try {

            console.log("vm: changeNick:", nickname, auth0_id)
            if (!auth0_id) {
                alert('Virhe: Auth0 ID:tä ei löytynyt.')
                return
            }
            await changeNewNickname.execute(nickname, auth0_id)
            await auth.updateUser({ nickname })


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
            auth.logout()
            setTimeout(() => {
                onLogout()
            }, 1500)
        } catch (e: any) {
            console.log('Logged out.')
        }
    }

    // Function to delete account
    const deleteUser = async () => {

        const id = await AsyncStorage.getItem("auth0_id")
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
            auth.logout()
            onSuccess()
        } catch (e: any) {
            console.log('User delete failed.')
        }
    }

    // Select image for profilepic
    const selectProfileImage = async () => {
        try {
            const uri = await pickImageFromGallery();
            if (uri) setImageUri(uri);
        } catch (e) {
            setError("Kuvagallerian käyttö estetty");
        }
    };

    return {
        nickname,
        setNickname,
        isNickAvailable,
        showCheck,
        checkNickname,
        changeNick,
        //isLoggedIn,
        logoutUser,
        deleteUser,
        imageUri,
        error,
        selectProfileImage
    }

}