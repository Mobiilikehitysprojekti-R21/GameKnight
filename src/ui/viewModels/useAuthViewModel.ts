import { useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import jwtDecode from 'jwt-decode';

export function useAuthViewModel() {
  const { user, error, authorize, clearSession, getCredentials } = useAuth0();

  useEffect(() => {
    const logCustomUsername = async () => {
      try {
        if (!user) {
          return;
        }
        const credentials = await getCredentials();
        if (credentials?.idToken) {
          const decoded: any = jwtDecode(credentials.idToken);
          console.log(
            'Custom username claim:',
            decoded['https://gameknight.app/username']
          );
        }
      } catch (e) {
        console.log('Error getting credentials', e);
      }
    };

    logCustomUsername();
  }, [user, getCredentials]);

  const loggedIn = !!user;
  const displayName = (user as any)?.name ?? (user as any)?.email ?? '';
  const errorMessage = (error as Error | undefined)?.message;

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log('Login failed', e);
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Logout failed', e);
    }
  };

  return {
    user,
    loggedIn,
    displayName,
    errorMessage,
    login,
    logout,
  };
}
