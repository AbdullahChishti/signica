'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function RequestW9Form() {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendorName || !vendorEmail) return

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Redirect to success page
    router.push('/request/success')
  }

  if (!user) {
    return <div>Redirecting...</div>
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#4793ea' }}></div>
              <span className="text-xl font-semibold text-gray-900">Form W9 App</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/admin/request" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">
                New Request
              </Link>
              <Link href="/form/demo" className="text-gray-600 hover:text-gray-900 font-medium">
                Preview Form
              </Link>
            </nav>
          </div>

          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Request W-9</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Vendor Name Field */}
            <div className="space-y-2">
              <Label htmlFor="vendorName" className="text-sm font-medium text-gray-700">
                Vendor Name
              </Label>
              <Input
                id="vendorName"
                type="text"
                placeholder="Enter vendor name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                required
              />
            </div>

            {/* Vendor Email Field */}
            <div className="space-y-2">
              <Label htmlFor="vendorEmail" className="text-sm font-medium text-gray-700">
                Vendor Email
              </Label>
              <Input
                id="vendorEmail"
                type="email"
                placeholder="Enter vendor email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                required
              />
            </div>

            {/* Send Request Button */}
            <Button
              type="submit"
              className="w-full text-white py-3 mt-8 hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#4793ea' }}
              disabled={isLoading || !vendorName || !vendorEmail}
            >
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Sending...' : 'Send Request'}
            </Button>
          </form>

          {/* How it works section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">How it works:</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We'll send an email to your vendor with a secure link to fill out their W-9 form. You'll receive a
              notification once they've submitted it. All information is encrypted and stored securely.
            </p>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">Need help? </span>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
