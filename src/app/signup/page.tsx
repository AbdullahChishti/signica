'use client'

import React, { useState } from "react"
import Link from "next/link"
import { Shield, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Header from "@/components/Header"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Header />

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:py-20">
        <div className="w-full max-w-lg">
          {/* Background Card */}
          <div className="relative overflow-hidden rounded-2xl bg-card border shadow-large p-8 md:p-12">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Create Your Account
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  Join thousands of businesses streamlining their W-9 process
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Free 14-day trial • No credit card required
                </div>
              </div>

              {/* Signup Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground" htmlFor="full-name">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      className="flex w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      id="full-name"
                      name="full-name"
                      placeholder="Enter your full name"
                      required
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      className="flex w-full rounded-xl border border-input bg-background pl-10 pr-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      required
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      className="flex w-full rounded-xl border border-input bg-background pl-10 pr-12 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      id="password"
                      name="password"
                      placeholder="Create a strong password"
                      required
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      className="flex w-full rounded-xl border border-input bg-background pl-10 pr-12 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      id="confirm-password"
                      name="confirm-password"
                      placeholder="Confirm your password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-8 w-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Create Account
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
                    <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary h-12 px-8 w-full"
                    href="/login"
                  >
                    Sign In Instead
                  </Link>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  By creating an account, you agree to our{' '}
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
