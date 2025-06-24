'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const success = await login(email, password)
    if (success) {
      router.push('/admin')
    } else {
      setError('Invalid email or password. Try admin@formw9.com / admin123')
    }
  }

  if (user) {
    return <div>Redirecting...</div>
  }
  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden" style={{
      '--primary-color': '#4793ea',
      '--secondary-color': '#f0f2f4',
      '--text-primary': '#111418',
      '--text-secondary': '#637488',
      '--border-color': '#e5e7eb',
      '--background-light': '#ffffff',
      backgroundColor: '#ffffff'
    } as React.CSSProperties}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-sky-100">
          <div className="w-full max-w-md p-6 sm:p-8 bg-white shadow-xl rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Welcome back</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Sign in to your account to continue</p>
              <p className="mt-2 text-xs text-blue-600">Demo: admin@formw9.com / admin123</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5" htmlFor="email">Email</label>
                <input
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow"
                  id="email"
                  name="email"
                  placeholder="admin@formw9.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-[var(--text-primary)]" htmlFor="password">Password</label>
                  <a href="#" className="text-xs font-medium text-[var(--primary-color)] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow"
                  id="password"
                  name="password"
                  placeholder="admin123"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--text-secondary)]">
                  Remember me
                </label>
              </div>
              
              <div>
                <button
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 disabled:opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="truncate">
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </span>
                </button>
              </div>
            </form>
            
            <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
              Don't have an account?{' '}
              <Link className="font-medium text-[var(--primary-color)] hover:underline" href="/signup">Sign up</Link>
            </p>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-8 text-center border-t border-[var(--border-color)]">
          <p className="text-sm text-[var(--text-secondary)]">© 2024 Tax Forms Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
