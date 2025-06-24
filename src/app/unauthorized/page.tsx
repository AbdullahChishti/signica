'use client'

import { useRouter } from 'next/navigation'
import { Shield, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user } = useAuth()

  const handleGoBack = () => {
    if (user) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-600" />
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          
          <p className="text-muted-foreground mb-8">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <Button onClick={handleGoBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>

          {/* User Info */}
          {user && (
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Signed in as: <span className="font-medium">{user.email}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
