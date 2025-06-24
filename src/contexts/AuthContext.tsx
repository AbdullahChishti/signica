'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
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
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  console.log(`🔄 AUTH_CONTEXT: Render - user: ${user?.email || 'null'}, loading: ${isLoading}, initialized: ${isInitialized}`)

  // Simple initialization - just check if user exists
  useEffect(() => {
    console.log(`🚀 AUTH_CONTEXT: Starting simple initialization`)
    
    let mounted = true

    const initialize = async () => {
      try {
        console.log(`🔍 AUTH_CONTEXT: Getting current session`)
        const { data: { session } } = await supabase.auth.getSession()

        if (mounted) {
          if (session?.user) {
            console.log(`✅ AUTH_CONTEXT: Session found for ${session.user.email}`)
            setUser({
              id: session.user.id,
              email: session.user.email!,
              name: session.user.email?.split('@')[0] || 'User'
            })
          } else {
            console.log(`❌ AUTH_CONTEXT: No session found`)
            setUser(null)
          }
        }
      } catch (error) {
        console.error('❌ AUTH_CONTEXT: Error during initialization:', error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          console.log(`✅ AUTH_CONTEXT: Initialization complete`)
          setIsInitialized(true)
        }
      }
    }

    // Initialize immediately
    initialize()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`🔔 AUTH_CONTEXT: Auth state changed - ${event}`)
      
      if (!mounted) return

      if (session?.user) {
        console.log(`👤 AUTH_CONTEXT: Setting user from auth change`)
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.email?.split('@')[0] || 'User'
        })
      } else {
        console.log(`🚫 AUTH_CONTEXT: Clearing user from auth change`)
        setUser(null)
      }
    })

    return () => {
      console.log(`🧹 AUTH_CONTEXT: Cleanup`)
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log(`🔐 AUTH_CONTEXT: Login attempt for ${email}`)
    
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        console.error(`❌ AUTH_CONTEXT: Login error - ${error.message}`)
        setIsLoading(false)
        
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Invalid email or password' }
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Please confirm your email address' }
        }
        
        return { success: false, error: error.message }
      }

      if (data.user) {
        console.log(`✅ AUTH_CONTEXT: Login successful for ${data.user.email}`)
        // User will be set by the auth state change listener
        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      console.error('❌ AUTH_CONTEXT: Login error:', error)
      setIsLoading(false)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const logout = async () => {
    console.log(`👋 AUTH_CONTEXT: Logout initiated`)
    
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('❌ AUTH_CONTEXT: Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      isInitialized
    }}>
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
