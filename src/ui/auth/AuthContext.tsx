import React, { createContext, useState } from 'react'

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
  const login = (token: string, userData: any) => {
    setAccessToken(token)               // token is set
    setUser(userData)                   // user data is stored
    setIsLoggedIn(true)                 // boolean is set true ( user is logged in )
  }

  // LOGOUT
  const logout = () => {
    setAccessToken(null)    // token is set to null
    setUser(null)           // user data is set to null
    setIsLoggedIn(false)    // boolean is set false ( user has logged out )
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