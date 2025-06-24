import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

// Sign up new user
export async function signUp(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })

    if (error) {
      throw new AuthError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Failed to create account')
  }
}

// Sign in user
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new AuthError(error.message)
    }

    return data
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Failed to sign in')
  }
}

// Sign out user
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new AuthError(error.message)
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Failed to sign out')
  }
}

// Get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw new AuthError(error.message)
    }

    if (!user) {
      return null
    }

    // Get user profile from our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single()

    if (profileError) {
      // If profile doesn't exist, create it
      const name = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
      await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          name
        })
      
      return {
        id: user.id,
        email: user.email!,
        name
      }
    }

    return {
      id: user.id,
      email: user.email!,
      name: profile.name
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Failed to get current user')
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    return user !== null
  } catch {
    return false
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      try {
        const user = await getCurrentUser()
        callback(user)
      } catch {
        callback(null)
      }
    } else {
      callback(null)
    }
  })
}
