'use client'

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react"
import Header from "@/components/Header"
import { supabase } from "@/lib/supabase"
import { RequireNoAuth } from "@/components/AuthGuard"
import { ButtonLoader } from "@/components/ui/loader"
import { Button } from "@/components/ui/button"

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
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      // Create user account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            full_name: formData.name
          }
        }
      })

      if (signUpError) {
        throw signUpError
      }

      if (data.user) {
        // Redirect to login with success message
        router.push('/login?message=signup_success')
      }
    } catch (error: any) {
      console.error('Sign up error:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RequireNoAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        <main className="flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-md">
            
            {/* Main Signup Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  0 10px 20px -8px rgba(0, 0, 0, 0.15),
                  0 4px 15px -3px rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Join the mission</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  Create account
                </h1>
                <p className="text-gray-600/90 font-medium">
                  Start collecting W-9s <span className="text-gray-700">like a pro</span>
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-700 text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                    placeholder="John Smith"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                    placeholder="john@company.com"
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                      placeholder="Create password"
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

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Create Account Button */}
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  {isLoading ? (
                    <>
                      <ButtonLoader size="sm" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-gray-600/80 font-medium">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                    Sign in
                  </Link>
                </p>

                <p className="text-xs text-gray-500/80 font-medium">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-gray-700 transition-colors">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="underline hover:text-gray-700 transition-colors">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RequireNoAuth>
  )
}
