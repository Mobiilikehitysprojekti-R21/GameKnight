import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useHomeScreenViewModel() {

  const [nickname, setNickname] = useState<string | null>(null)
  const [auth0_id, setAuth0_id] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [avatar_url, setAvatar_url] = useState<string | null>(null)
  const auth = useAuth()

  // Sync user info from AuthContext
  useEffect(() => {
    console.log('[HomeScreenViewModel] auth.user changed:', auth.user)
    setNickname(auth.user?.nickname ?? null)
    setAuth0_id(auth.user?.sub ?? null)
    setEmail(auth.user?.email ?? null)
    const newAvatarUrl = auth.user?.avatar_url ?? null
    console.log('[HomeScreenViewModel] Setting avatar_url:', newAvatarUrl)
    setAvatar_url(newAvatarUrl)
  }, [auth.user, auth.isLoggedIn])

  return {
    nickname, auth0_id, email, avatar_url
  };
}
