'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user, isLoading, isInitialized } = useAuth()
  const searchParams = useSearchParams()

  console.log(`🔍 LOGIN_PAGE: Render - user: ${user?.email || 'null'}, loading: ${isLoading}, initialized: ${isInitialized}, submitting: ${isSubmitting}`)

  // Check for success message from signup
  useEffect(() => {
    const message = searchParams.get('message')
    if (message) {
      setSuccessMessage(decodeURIComponent(message))
    }
  }, [searchParams])

  // Handle redirect when user is authenticated
  useEffect(() => {
    if (isInitialized && user) {
      const redirectTo = searchParams.get('redirect')
      console.log(`🎯 LOGIN_PAGE: User authenticated, redirecting to: ${redirectTo || '/admin'}`)
      
      setIsSubmitting(false)
      
      setTimeout(() => {
        if (redirectTo && redirectTo !== '/login' && redirectTo !== '/signup') {
          window.location.href = redirectTo
        } else {
          window.location.href = '/admin'
        }
      }, 100)
    }
  }, [user, isInitialized, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`📝 LOGIN_PAGE: Form submitted for ${email}`)
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login(email, password)

      if (result.success) {
        console.log(`✅ LOGIN_PAGE: Login successful`)
      } else {
        console.error(`❌ LOGIN_PAGE: Login failed - ${result.error}`)
        setError(result.error || 'Invalid email or password')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('❌ LOGIN_PAGE: Login error:', error)
      setError('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is already authenticated, show redirecting message
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-md">
          
          {/* Success Message (if any) */}
          {successMessage && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-sm text-green-700 text-center font-medium">{successMessage}</p>
            </div>
          )}

          {/* Main Login Card */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 ring-1 ring-black/5"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 10px 20px -8px rgba(0, 0, 0, 0.15),
                0 4px 15px -3px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(0, 0, 0, 0.05)
              `
            }}
          >
            
            {/* Header Section */}
            <div className="text-center mb-10">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600">
                Sign in to continue to Signica
              </p>
            </div>

            {/* Error Message (contextual) */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting || !email || !password}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sign Up Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Terms (minimal) */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray-700 transition-colors">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">Privacy Policy</Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
