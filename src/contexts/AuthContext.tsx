'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { AuthUser, signIn, signOut, getCurrentUser, onAuthStateChange } from '@/lib/auth'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    // Get initial user from Supabase
    getCurrentUser()
      .then((authUser) => {
        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            name: authUser.name,
            role: 'admin' // For now, all users are admins
          })
        }
      })
      .catch((error) => {
        console.error('Error getting current user:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email,
          name: authUser.name,
          role: 'admin'
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const { user: authUser } = await signIn(email, password)

      if (authUser) {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            name: currentUser.name,
            role: 'admin'
          })
          setIsLoading(false)
          return true
        }
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
