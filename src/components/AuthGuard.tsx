'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireRole?: 'admin' | 'candidate' | 'both'
  redirectTo?: string
}

export default function AuthGuard({ 
  children, 
  requireAuth = true, 
  requireRole,
  redirectTo 
}: AuthGuardProps) {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Don't redirect until auth is initialized
    if (!isInitialized) return

    // If auth is required but user is not logged in
    if (requireAuth && !user) {
      router.push(redirectTo || '/login')
      return
    }

    // If user is logged in but shouldn't be (e.g., on login page)
    if (!requireAuth && user) {
      router.push(user.defaultDashboard)
      return
    }

    // If specific role is required
    if (requireRole && user) {
      const hasRequiredRole = checkUserRole(user, requireRole)
      if (!hasRequiredRole) {
        // Redirect to appropriate dashboard or show unauthorized
        router.push('/unauthorized')
        return
      }
    }
  }, [user, isInitialized, requireAuth, requireRole, redirectTo, router])

  // Show loading while auth is being initialized
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth is required but user is not logged in, don't render children
  if (requireAuth && !user) {
    return null
  }

  // If user is logged in but shouldn't be (e.g., on login page), don't render children
  if (!requireAuth && user) {
    return null
  }

  // If specific role is required and user doesn't have it, don't render children
  if (requireRole && user && !checkUserRole(user, requireRole)) {
    return null
  }

  return <>{children}</>
}

function checkUserRole(user: any, requiredRole: 'admin' | 'candidate' | 'both'): boolean {
  switch (requiredRole) {
    case 'admin':
      return user.role.isAdmin
    case 'candidate':
      return user.role.isCandidate
    case 'both':
      return user.role.isAdmin && user.role.isCandidate
    default:
      return false
  }
}

// Convenience components for specific use cases
export function RequireAuth({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  return (
    <AuthGuard requireAuth={true} redirectTo={redirectTo}>
      {children}
    </AuthGuard>
  )
}

export function RequireNoAuth({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={false}>
      {children}
    </AuthGuard>
  )
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={true} requireRole="admin">
      {children}
    </AuthGuard>
  )
}

export function RequireCandidate({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={true} requireRole="candidate">
      {children}
    </AuthGuard>
  )
}
