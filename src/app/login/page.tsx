'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
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
      
      // Reset submitting state
      setIsSubmitting(false)
      
      // Small delay to ensure state updates, then redirect
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
        // Don't set isSubmitting to false - let the redirect happen
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is already authenticated, show redirecting message
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:py-20">
        <div className="w-full max-w-lg">
          {/* Background Card */}
          <div className="relative overflow-hidden rounded-2xl bg-card border shadow-large p-8 md:p-12">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Welcome back
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  Sign in to your Signica account
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-600 font-medium">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-foreground" htmlFor="password">
                      Password
                    </label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-2"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="remember-me" className="text-sm text-muted-foreground">
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-8 w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Sign in to Dashboard
                    </>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted-foreground/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">New to Signica?</span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary h-12 px-8 w-full"
                    href="/signup"
                  >
                    Create Account
                  </Link>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  By signing in, you agree to our{' '}
                  <Link className="font-medium text-primary hover:text-primary/80 transition-colors" href="/terms">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link className="font-medium text-primary hover:text-primary/80 transition-colors" href="/privacy">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
