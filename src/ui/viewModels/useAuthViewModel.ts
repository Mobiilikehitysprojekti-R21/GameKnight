import { useEffect, useMemo, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const AUTH0_DOMAIN = 'gameknight.eu.auth0.com'
const CLIENT_ID = '7fgZoHliyAcQanPFFr5fBgtq3vu1BTJe'

const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
};

export function useAuthViewModel() {
  
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const redirectUri = AuthSession.makeRedirectUri()

  console.log("redirect uri: ", redirectUri)

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      usePKCE: true,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      responseType: AuthSession.ResponseType.Code,
    },
    discovery
  )

  useEffect(()=> {
    if (response?.type === 'success') {
      const { code } = response.params
    
    AuthSession.exchangeCodeAsync(
      {
      clientId: CLIENT_ID,
      code,
      redirectUri,
      extraParams: {
      code_verifier: request?.codeVerifier ?? '',
    },
        },
    discovery
  )
  .then((tokenResult) => {
    setAccessToken(tokenResult.accessToken ?? null)

    if (tokenResult.accessToken) {
      fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
      })
      .then((res) => res.json())
      .then(setUser)
    }
  })
  .catch((e) => {
    setErrorMessage(e.message)
  })
  }

  }, [response])

  const loggedIn = !!user;
  const displayName = (user as any)?.name ?? (user as any)?.email ?? '';

  const login = async () => {
    setErrorMessage(undefined)
    promptAsync()
  };

  const logout = async () => {
    setAccessToken(null)
    setUser(null)
  };

  const getAccessToken = async (): Promise<string | null> => {
    return accessToken
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
