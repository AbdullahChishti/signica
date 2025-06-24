'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"
import { PageLoader, ButtonLoader } from "@/components/ui/loader"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user, isLoading, isInitialized } = useAuth()
  const searchParams = useSearchParams()

  console.log('🔍 LOGIN_PAGE: Rendering with user:', !!user, 'isLoading:', isLoading, 'isInitialized:', isInitialized)

  // Get redirect parameter from URL
  const redirectTo = searchParams?.get('redirect') || '/admin'

  // Check for success message from signup
  useEffect(() => {
    const message = searchParams?.get('message')
    if (message === 'signup_success') {
      setSuccessMessage('Account created successfully! Please sign in.')
    }
  }, [searchParams])

  // Reset isSubmitting when user becomes authenticated
  useEffect(() => {
    if (user && isSubmitting) {
      setIsSubmitting(false)
    }
  }, [user, isSubmitting])

  // Redirect if already authenticated
  useEffect(() => {
    if (user && isInitialized) {
      console.log('🔄 LOGIN_PAGE: User authenticated, redirecting to:', redirectTo)
      window.location.href = redirectTo
    }
  }, [user, isInitialized, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      console.log('🔐 LOGIN_PAGE: Attempting login for:', email)
      await login(email, password)
      console.log('✅ LOGIN_PAGE: Login successful')
    } catch (error) {
      console.error('❌ LOGIN_PAGE: Login failed:', error)
      setError(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading while auth is initializing
  if (isLoading || !isInitialized) {
    return (
      <PageLoader text="Loading..." />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50/80 backdrop-blur-sm border border-green-200/60 text-green-700 text-center font-medium">
              {successMessage}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Welcome back
              </h1>
              <p className="text-gray-600/90 font-medium">
                Sign in to your <span className="text-gray-700">command center</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-700 text-center font-medium">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <ButtonLoader size="sm" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign in
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600/80 font-medium">
                New to Signica?{' '}
                <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
