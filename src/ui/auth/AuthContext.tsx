import React, { createContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

type AuthContextType = {
  isLoggedIn: boolean // tells if user is logged in
  accessToken: string | null
  user: any
  login: (token: string, userData: any) => void   // function to set login state true (aka login)
  logout: () => void  // function to set login state false (aka logout)
  getAccessToken: () => Promise<string | null>
}

// Create auth context for authentication
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props for AuthProvider
type AuthProviderProps = {
  children: React.ReactNode
}

// AuthProvider controls login state
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  // LOGIN
  const login = async (token: string, userData: any) => {
    setAccessToken(token)               // token is set
    setUser(userData)                   // user data is stored
    // Store user data locally
    await AsyncStorage.setItem("auth0_id", userData.sub)
    await AsyncStorage.setItem("nickname", userData.nickname)
    await AsyncStorage.setItem("email", userData.email)
    // REFRESH TOKEN?
    // TODO: userdatan säilöminen paikallisesti, elinkaari?
    setIsLoggedIn(true)                 // boolean is set true ( user is logged in )
  }

  // LOGOUT
  const logout = async () => {
    setAccessToken(null)    // token is set to null
    setUser(null)           // user data is set to null
    // Clear locally stored data
    AsyncStorage.removeItem
    await AsyncStorage.clear()
    setIsLoggedIn(false)    // boolean is set false ( user has logged out )
    // Inform user about logout
    Toast.show({
                    type: 'success',
                    text1: 'Kirjauduit ulos.',
                    text2: `Nähdään taas pian!`,
                    position: 'top',
                    visibilityTime: 3000,
    })
  }

  const getAccessToken = async (): Promise<string | null> => {
    console.log("accessToken from context:", accessToken)
    return accessToken
  }



  // return context to all children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
