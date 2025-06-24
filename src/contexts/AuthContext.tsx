'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getUserRole, getDefaultDashboardRoute, type UserRole } from '@/lib/database'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  defaultDashboard: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isLoading: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state and listen for changes
  useEffect(() => {
    let mounted = true

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          return
        }

        if (session?.user && mounted) {
          await setUserWithRole(session.user)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        if (mounted) {
          setIsLoading(false)
          setIsInitialized(true)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      setIsLoading(true)

      if (session?.user) {
        await setUserWithRole(session.user)
      } else {
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const setUserWithRole = async (supabaseUser: SupabaseUser) => {
    try {
      const [role, defaultDashboard] = await Promise.all([
        getUserRole(supabaseUser.id, supabaseUser.email!),
        getDefaultDashboardRoute(supabaseUser.id, supabaseUser.email!)
      ])

      const userName = supabaseUser.user_metadata?.name ||
                      supabaseUser.email?.split('@')[0] ||
                      'User'

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: userName,
        role,
        defaultDashboard
      })
    } catch (error) {
      console.error('Error setting user with role:', error)
      // Set user without role info if role detection fails
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
        role: { isAdmin: false, isCandidate: false, primaryRole: 'none' },
        defaultDashboard: '/admin'
      })
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setIsLoading(false)
        return { success: false, error: error.message }
      }

      if (data.user) {
        await setUserWithRole(data.user)
        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      setIsLoading(false)
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Logout error:', error)
      }
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isInitialized }}>
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
