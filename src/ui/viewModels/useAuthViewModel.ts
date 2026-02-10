import { useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from '../auth/AuthContext'

// Completes auth session when returning from the browser
WebBrowser.maybeCompleteAuthSession();

// Auth0 config
const AUTH0_DOMAIN = 'gameknight.eu.auth0.com'
const CLIENT_ID = '7fgZoHliyAcQanPFFr5fBgtq3vu1BTJe'
const AUTH0_AUDIENCE = 'api.gameknight.app' // Audience tells Auth0 which API the token is wanted for. Returns JWT(not JWE)

// OAuth discovery endpoints
const discovery = {
  authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
  tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
};

export function useAuthViewModel() {
  
  const auth = useContext(AuthContext)  // Access authentication context

  // Ensure hook is used inside AuthProvider
  if (!auth) {
    throw new Error('useAuthViewModel must be used within AuthProvider')
  }

  const [errorMessage, setErrorMessage] = useState<string | undefined>()  // state for error messages
  
  
  // redirect URI for OAuth callback
  //!! Expo Go uses a custom scheme for deep linking
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'gameknight'  // this needs to match app.json
  }) 

  // console.log("redirect uri: ", redirectUri) TÄMÄ KANNATTAA TSEKATA JOS EI ALA TOIMIA, ja lisätä auth0 dashboardiin

  // Create authentication request using Expo AuthSession
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      usePKCE: true,  // enables PKCE (prevents stealing token)
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      responseType: AuthSession.ResponseType.Code,
      extraParams: {
        audience: AUTH0_AUDIENCE, // This ensures Auth0 issues a JWT (RS256) for backend
      }
    },
    discovery
  )

  // Handle authorization response
  useEffect(()=> {
    if (response?.type === 'success') {
      const { code } = response.params
    
      // Exchange authorization code for access token
      AuthSession.exchangeCodeAsync(
        {
          clientId: CLIENT_ID,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request?.codeVerifier ?? '', // PKCE code verifier
            audience: AUTH0_AUDIENCE, // This ensures Auth0 issues a JWT (RS256) for backend
          },
        },
        discovery
      )
  .then((tokenResult) => {
    //console.log("Result token:", tokenResult.accessToken) // debug: check JWT/JWE
    const token = tokenResult.accessToken ?? null

    // Fetch user profile from Auth0
    if (token) {
      fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
      })
      .then((res) => res.json())
      .then((userData) => {
        auth.login(token, userData) // store token and user data in authContext
      })
    }
  })
  .catch((e) => {
    // Handle errors
    setErrorMessage(e.message)
  })
  }

  }, [response])

  // LOGIN
  const login = async () => {
    setErrorMessage(undefined)
    promptAsync()
  };

  // LOGOUT !! 
  const logout = async () => {
    auth.logout()
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
