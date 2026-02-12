import { useContext } from 'react'
import { AuthContext } from './AuthContext'

// Custom hook to use AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext)

  // If context is undefined, hook has been used outside Provider -> throw error
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}