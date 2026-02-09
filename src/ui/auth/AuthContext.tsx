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

  const login = (token: string, userData: any) => {
    setAccessToken(token)
    setUser(userData)
    console.log("userdata:", userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    setIsLoggedIn(false)
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
