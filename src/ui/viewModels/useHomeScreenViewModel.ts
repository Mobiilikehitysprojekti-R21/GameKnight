import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useHomeScreenViewModel() {
  // Create states etc needed in view

  // Create functions needed in view
  // Don't call api's. Create and use classes in application
  // async function getUser() {
  //   const user = await getUserInfo.execute()
  // }

    const [nickname, setNickname] = useState<string | null>(null)
    const [auth0_id, setAuth0_id] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const { isLoggedIn } = useAuth()
  
    // Fetch user info from secure store on mount
    useEffect(() => {
      const fetchUser = async () => {
        const storedNickname = await AsyncStorage.getItem("nickname")
        setNickname(storedNickname)
        const storedAuth0_id = await AsyncStorage.getItem("auth0_id")
        setAuth0_id(storedAuth0_id)
        const storedEmail = await AsyncStorage.getItem("email")
        setEmail(storedEmail)
        console.log("homeVM: ", nickname, auth0_id, email)
      }
      fetchUser()
    }, [isLoggedIn])

  return {
    nickname, auth0_id, email
  };
}
