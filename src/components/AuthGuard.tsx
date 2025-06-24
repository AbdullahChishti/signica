'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { PageLoader } from '@/components/ui/loader'

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
    
    // Don't redirect until auth is fully initialized
    if (!isInitialized || isLoading) return

    if (requireAuth && !user) {
      console.log(`🔒 AUTH_GUARD: Redirecting to login - no user found`)
      router.push('/login')
    } else if (!requireAuth && user) {
      console.log(`🏠 AUTH_GUARD: Redirecting to admin - user logged in`)
      router.push('/admin')
    } else {
      console.log(`✅ AUTH_GUARD: Auth state valid`)
    }
  }, [user, isInitialized, isLoading, requireAuth, router])

  // Show loading while auth is being initialized
  if (!isInitialized || isLoading) {
    console.log(`⏳ AUTH_GUARD: Showing loading - initialized: ${isInitialized}, loading: ${isLoading}`)
    return (
      <PageLoader text="Initializing..." />
    )
  }

  // If auth is required but user is not logged in, show loading (redirect will happen)
  if (requireAuth && !user) {
    console.log(`🔐 AUTH_GUARD: Auth required but no user, showing redirect loading`)
    return (
      <PageLoader text="Redirecting to login..." />
    )
  }

  // If auth is not required but user is logged in, show loading (redirect will happen)  
  if (!requireAuth && user) {
    console.log(`🔄 AUTH_GUARD: User logged in on auth page, showing redirect loading`)
    return (
      <PageLoader text="Redirecting to dashboard..." />
    )
  }

  // If we get here, auth state is valid for the requirement
  console.log(`✅ AUTH_GUARD: Rendering children`)
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
