import Link from "next/link"
import Header from "@/components/Header"

export default function SignUpPage() {
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
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Get started for free</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Create your account to access our W9 application.</p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5" htmlFor="email">Email</label>
                <input 
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow" 
                  id="email" 
                  name="email" 
                  placeholder="you@example.com" 
                  required 
                  type="email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5" htmlFor="full-name">Full name</label>
                <input 
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow" 
                  id="full-name" 
                  name="full-name" 
                  placeholder="John Doe" 
                  required 
                  type="text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5" htmlFor="password">Password</label>
                <input 
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5" htmlFor="confirm-password">Confirm password</label>
                <input 
                  className="flex w-full rounded-lg border border-[var(--border-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 px-4 text-sm placeholder:text-[var(--text-secondary)] transition-shadow" 
                  id="confirm-password" 
                  name="confirm-password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                />
              </div>
              
              <div>
                <button 
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2" 
                  type="submit"
                >
                  <span className="truncate">Create account</span>
                </button>
              </div>
            </form>
            
            <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
              By signing up, you agree to our{' '}
              <a className="font-medium text-[var(--primary-color)] hover:underline" href="#">Terms of Service</a>
              {' '}and{' '}
              <a className="font-medium text-[var(--primary-color)] hover:underline" href="#">Privacy Policy</a>.
            </p>
            
            <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link className="font-medium text-[var(--primary-color)] hover:underline" href="/login">Log in</Link>
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
