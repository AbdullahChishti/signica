'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function DebugAuth() {
  const { user, isLoading, isInitialized } = useAuth()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h2 className="font-semibold">Auth State:</h2>
            <p>isLoading: {isLoading ? 'true' : 'false'}</p>
            <p>isInitialized: {isInitialized ? 'true' : 'false'}</p>
            <p>user: {user ? 'exists' : 'null'}</p>
          </div>

          {user && (
            <div className="p-4 border rounded">
              <h2 className="font-semibold">User Info:</h2>
              <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}

          <div className="p-4 border rounded">
            <h2 className="font-semibold">Actions:</h2>
            <div className="space-x-2 mt-2">
              <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
                Go to Login
              </a>
              <a href="/admin" className="bg-green-500 text-white px-4 py-2 rounded">
                Go to Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
