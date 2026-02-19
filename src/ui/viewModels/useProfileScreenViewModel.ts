import { useState, useEffect } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import { useAuth } from "../auth/useAuth";
import { ChangeNickname } from "../../application/ChangeNickname";
import { DeleteUser } from "../../application/DeleteUser";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pickImageFromGallery } from "../services/imageService";
import { uploadProfileImage } from "../services/uploadService";
import Constants from 'expo-constants';

// Viewmodel hook for profile screen logic

export const useProfileScreenViewModel = (onSuccess: () => void, onLogout: () => void) => {

    // Nickname editing state
    const [nickname, setNickname] = useState("")
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available
    const [showCheck, setShowCheck] = useState(false)               // state to handle user notification text about nickname´s availability

    // Profile image state
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isUploadin, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    // Cached user fields for the view
    const [userNickname, setUserNickname] = useState<string | null>(null)
    const [auth0_id, setAuth0_id] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    // Repository and UseCase instances (application)
    const auth = useAuth()
    const repo = new UserApiRepository(auth.getAccessToken)
    const changeNewNickname = new ChangeNickname(repo)
    const deleteUserAccount = new DeleteUser(repo)

    // Check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
        setShowCheck(true)  // notify user if nickname is available or not
    }

    // Fetch user info when the ViewModel is mounted
    useEffect(() => {
        setUserNickname(auth.user?.nickname ?? null)
        setAuth0_id(auth.user?.sub ?? null)
        setEmail(auth.user?.email ?? null)
        setImageUri(auth.user?.avatar_url ?? null)
        setToken(auth.accessToken)
    }, [])

    // Change nickname and update local auth state
    const changeNick = async () => {
        try {

            console.log("vm: changeNick:", nickname, auth0_id)
            if (!auth0_id) {
                alert('Virhe: Auth0 ID:tä ei löytynyt.')
                return
            }
            await changeNewNickname.execute(nickname, auth0_id)
            await auth.updateUser({ nickname }) // user data is updated via auth

            // Toast to inform user
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

    // Logout and return to auth screen after toast delay
    const logoutUser = async () => {
        try {
            auth.logout()
            setTimeout(() => {  // delay navigation to HomeScreen
                onLogout()
            }, 1500)
        } catch (e: any) {
            console.log('Logged out.')
        }
    }

    // Delete account and clean up local state
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

    // Select image for profile pic
    const selectProfileImage = async () => {
        try {
            const uri = await pickImageFromGallery();
            if (uri) setImageUri(uri);
        } catch (e) {
            setError("Kuvagallerian käyttö estetty");
        }
    };

    // Upload image to backend and update avatar URL
    const saveProfileImage = async () => {
        if (!imageUri) return

        setIsUploading(true)
        setError(null)

        try {
            if (!token) return
            const newAvatarUrl = await uploadProfileImage(imageUri, auth.getAccessToken)

            // Normalize avatar URL (add API base if relative path)
            const apiBaseUrl = Constants.expoConfig?.extra?.API_URL ?? ''
            let normalizedUrl = newAvatarUrl
            if (newAvatarUrl && !/^https?:\/\//i.test(newAvatarUrl)) {
                const base = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl    // Ensure no double slashes when joining base and path
                const path = newAvatarUrl.startsWith('/') ? newAvatarUrl : `/${newAvatarUrl}`   // Ensure path starts with a single slash
                normalizedUrl = `${base}${path}`
            }

            // Update AuthContext with normalized avatar_url
            await auth.updateUser({ avatar_url: normalizedUrl })

            // Toast to inform user
            Toast.show({
                type: 'success',
                text1: 'Profiilikuva vaihdettu',
                text2: `Onpa kaunista!`,
                position: 'top',
                visibilityTime: 3000,
            })
        } catch (e: any) {
            console.error('saveProfileImage error:', e)
            setError("kuvan tallennus epäonnistui")
        } finally {
            setIsUploading(false)
        }
    }

    return {
        nickname,
        setNickname,
        isNickAvailable,
        showCheck,
        checkNickname,
        changeNick,
        token,
        logoutUser,
        deleteUser,
        imageUri,
        error,
        selectProfileImage,
        saveProfileImage,
        isUploadin
    }

}