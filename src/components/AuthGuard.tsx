'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function AuthGuard({ 
  children, 
  requireAuth = true
}: AuthGuardProps) {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  console.log(`🛡️  AUTH_GUARD: Render - requireAuth: ${requireAuth}, user: ${user?.email || 'null'}, loading: ${isLoading}, initialized: ${isInitialized}`)

  useEffect(() => {
    console.log(`🔍 AUTH_GUARD: Effect - initialized: ${isInitialized}, loading: ${isLoading}`)
    
    // Don't redirect until auth is initialized
    if (!isInitialized || isLoading) return

    // If auth is required but user is not logged in, redirect to login
    if (requireAuth && !user) {
      console.log(`🔄 AUTH_GUARD: Auth required but no user, redirecting to login`)
      router.push('/login')
      return
    }

    // If auth is not required but user is logged in, redirect to admin
    if (!requireAuth && user) {
      console.log(`🔄 AUTH_GUARD: User logged in on auth page, redirecting to admin`)
      router.push('/admin')
      return
    }
  }, [user, isInitialized, isLoading, requireAuth, router])

  // Show loading while auth is being initialized
  if (!isInitialized || isLoading) {
    console.log(`⏳ AUTH_GUARD: Showing loading - initialized: ${isInitialized}, loading: ${isLoading}`)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth is required but user is not logged in, show loading (redirect will happen)
  if (requireAuth && !user) {
    console.log(`🔐 AUTH_GUARD: Auth required but no user, showing redirect loading`)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // If auth is not required but user is logged in, show loading (redirect will happen)
  if (!requireAuth && user) {
    console.log(`🔄 AUTH_GUARD: User logged in on auth page, showing redirect loading`)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  console.log(`✅ AUTH_GUARD: All checks passed, rendering children`)
  return <>{children}</>
}

// Convenience components for specific use cases
export function RequireAuth({ children }: { children: React.ReactNode }) {
  console.log(`🛡️  REQUIRE_AUTH: Rendering`)
  return (
    <AuthGuard requireAuth={true}>
      {children}
    </AuthGuard>
  )
}

export function RequireNoAuth({ children }: { children: React.ReactNode }) {
  console.log(`🚫 REQUIRE_NO_AUTH: Rendering`)
  return (
    <AuthGuard requireAuth={false}>
      {children}
    </AuthGuard>
  )
}
