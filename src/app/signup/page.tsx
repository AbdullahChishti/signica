'use client'

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react"
import Header from "@/components/Header"
import { supabase } from "@/lib/supabase"
import { RequireNoAuth } from "@/components/AuthGuard"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      })

      if (error) {
        setError(error.message)
        return
      }

      // Redirect to login with success message
      router.push('/login?message=Account created successfully! Please sign in.')
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RequireNoAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
          <div className="w-full max-w-md">
            
            {/* Main Signup Card */}
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
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-blue-600 mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Create your account
                </h1>
                <p className="text-gray-600">
                  Start your journey with Signica
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none group mt-6"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sign In Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms (minimal) */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="underline hover:text-gray-700 transition-colors">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">Privacy Policy</Link>
              </p>
            </div>

          </div>
        </main>
      </div>
    </RequireNoAuth>
  )
}
