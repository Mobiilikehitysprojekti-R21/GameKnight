import { useContext, useEffect, useMemo, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from '../auth/AuthContext'

WebBrowser.maybeCompleteAuthSession();

const AUTH0_DOMAIN = 'gameknight.eu.auth0.com'
const CLIENT_ID = '7fgZoHliyAcQanPFFr5fBgtq3vu1BTJe'

const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
};

export function useAuthViewModel() {
  
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('useAuthViewModel must be used within AuthProvider')
  }
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
    const token = tokenResult.accessToken ?? null

    if (token) {
      fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
      })
      .then((res) => res.json())
      .then((userData) => {
        auth.login(token, userData)
      })
    }
  })
  .catch((e) => {
    setErrorMessage(e.message)
  })
  }

  }, [response])


  const login = async () => {
    setErrorMessage(undefined)
    promptAsync()
  };

  const logout = async () => {
    auth.logout
  };

  return {
    user: auth.user,
    loggedIn: auth.isLoggedIn,
    displayName: auth.user?.nickname ?? '',
    errorMessage,
    login,
    logout,
    getAccessToken: auth.getAccessToken,
  };
}
