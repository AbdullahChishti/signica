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
import { createW9Request, generateDirectFormLink } from "@/lib/database"

export default function RequestW9Form() {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
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
    if (!vendorName || !vendorEmail || !user) return

    setIsLoading(true)
    setError('')

    try {
      // Create W9 request in Supabase
      const request = await createW9Request(vendorName, vendorEmail, user.id)

      console.log('W9 request created:', request)

      // Generate direct form link for the vendor
      const formLink = await generateDirectFormLink(request.id)

      console.log('Direct form link generated:', formLink)

      // TODO: Send email with direct form link to vendor
      // For now, we'll just show the link in console and redirect to success

      // Redirect to success page
      router.push('/request/success')
    } catch (error: any) {
      console.error('Error creating W9 request:', error)
      setError(error.message || 'Failed to create W9 request')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <div>Redirecting...</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Signica</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link href="/admin" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  Dashboard
                </Link>
                <Link href="/admin/request" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 border border-primary/20">
                  New Request
                </Link>
                <Link href="/form/demo" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  Preview Form
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <Send className="w-4 h-4 mr-2" />
            New W-9 Request
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
            Launch W-9 Request
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fire off a W-9 request in seconds. Your vendor gets a secure link, you get peace of mind.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* How it works section */}
            <div className="rounded-2xl border bg-card shadow-sm p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-primary">?</span>
                </div>
                How it works
              </h3>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Delivery</h4>
                    <p>We'll send a secure email to your vendor with a personalized W-9 form link</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Secure Completion</h4>
                    <p>They complete the form online with bank-level security and encryption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Instant Notification</h4>
                    <p>You receive instant notification and can download the completed W-9 form</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border bg-card shadow-sm p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Why Signica rocks</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Bank-level security & encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">IRS compliant form generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Automated email reminders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Real-time status tracking</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="rounded-2xl border bg-card shadow-sm p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to help you with any questions about the W-9 request process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#" className="inline-flex items-center justify-center rounded-lg text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 border border-primary/20 hover:border-primary/40">
                  Contact Support
                </a>
                <a href="#" className="inline-flex items-center justify-center rounded-lg text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 border border-primary/20 hover:border-primary/40">
                  View Documentation
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-card shadow-large p-8">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Request Details</h3>
                  <p className="text-sm text-muted-foreground">Enter the vendor information below to send a W-9 request.</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form className="relative space-y-6" onSubmit={handleSubmit}>
                  {/* Vendor Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="vendorName" className="text-sm font-semibold text-foreground">
                      Vendor/Contractor Name
                    </Label>
                    <Input
                      id="vendorName"
                      type="text"
                      placeholder="Enter the full legal name"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter the legal business name or individual's full name</p>
                  </div>

                  {/* Vendor Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="vendorEmail" className="text-sm font-semibold text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="vendorEmail"
                      type="email"
                      placeholder="vendor@company.com"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">We'll send the W-9 form link to this email address</p>
                  </div>

                  {/* Send Request Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-8 w-full"
                      disabled={isLoading || !vendorName || !vendorEmail}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send W-9 Request
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
