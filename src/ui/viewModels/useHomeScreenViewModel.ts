import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';

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
    const auth = useAuth()

    // Sync user info from AuthContext
    useEffect(() => {
      setNickname(auth.user?.nickname ?? null)
      setAuth0_id(auth.user?.sub ?? null)
      setEmail(auth.user?.email ?? null)
      console.log("homeVM: ", auth.user?.nickname, auth.user?.sub, auth.user?.email)
    }, [auth.user, auth.isLoggedIn])

  return {
    nickname, auth0_id, email
  };
}
