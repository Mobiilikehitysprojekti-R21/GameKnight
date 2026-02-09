import { useState } from 'react';
import { useAuth0 } from 'react-native-auth0';

export function useAuthViewModel() {
  const { user, error, authorize, clearSession, getCredentials } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const loggedIn = !!user;
  const displayName = (user as any)?.name ?? (user as any)?.email ?? '';
  const errorMessage = (error as Error | undefined)?.message;

  const login = async () => {
    try {
      await authorize();

      const creds = await getCredentials();
      console.log('access token:', creds.accessToken);

      if (creds.accessToken) {
        setAccessToken(creds.accessToken);
      }
    } catch (e) {
      console.log('Login failed', e);
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Logout failed', e);
    } finally {
      setAccessToken(null);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const creds = await getCredentials();
      console.log("accesstoken:", creds.accessToken)
      return creds.accessToken ?? null;
    } catch {
      return null;
    }
  };

  return {
    user,
    loggedIn,
    displayName,
    errorMessage,
    login,
    logout,
    getAccessToken,
  };
}
