import { useState } from "react";
import { UserApiRepository } from "../../infrastructure/api/UserApiRepository";
import { ChangeNickname } from "../../application/ChangeNickname";

export const useProfileScreenViewModel = (onSuccess: () => void) => {
    const [nickname, setNickname] = useState("")
    const [isNickAvailable, setIsNickAvailable] = useState(false)   // state to track if the nickname is available
    const [showCheck, setShowCheck] = useState(false)               // state to handle user notification text about nickname´s availability

    // Repository and UseCase instances (application)
    const repo = new UserApiRepository()
    const changeNewNickname = new ChangeNickname(repo)

    // Function to check if nickname is available
    const checkNickname = async () => {
        const available = await repo.validateNickname(nickname)
        setIsNickAvailable(available)
        setShowCheck(true)  // notify user if nickname is available or not
    }

    // Function to change Nickname
    const changeNick = async () => {
        try {
            //await changeNewNickname.execute(nickname)
            // clear field
            setNickname('')
            onSuccess()
        } catch (e: any) {
            console.error("Error changing nickname:", e.message || e)
            // Notify user about error in sign up
            alert(`Virhe nimimerkin vaihdossa: ${e.message || e}`)
        }
    }

    return {
        nickname,
        setNickname,
        isNickAvailable,
        showCheck,
        checkNickname,
        changeNick
    }

}