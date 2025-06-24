'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Sparkles, Mail, Shield, Zap, Clock, CheckCircle, HelpCircle, FileText, Users } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { createW9Request, generateDirectFormLink } from "@/lib/database"
import { RequireAuth } from "@/components/AuthGuard"
import Header from "@/components/Header"

export default function RequestW9Form() {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  // Auth guard will handle authentication

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

  // Auth guard handles this
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 lg:px-8 max-w-7xl">
          
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Launch Mission</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Launch W-9
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Request
              </span>
            </h1>
            
            <p className="text-xl text-gray-600/90 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Fire off W-9 requests in seconds. <span className="text-gray-700">Secure links, instant peace of mind.</span>
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            
            {/* Left Column - Information */}
            <div className="space-y-8">
              
              {/* How it works section */}
              <div 
                className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.15),
                    0 10px 20px -8px rgba(0, 0, 0, 0.1),
                    0 4px 15px -3px rgba(0, 0, 0, 0.05)
                  `
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center mr-4">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">How it works</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">Email Delivery</h4>
                      <p className="text-gray-600/90 leading-relaxed font-medium">Secure email with personalized link</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">Secure Completion</h4>
                      <p className="text-gray-600/90 leading-relaxed font-medium">Bank-level security, zero friction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">Instant Notification</h4>
                      <p className="text-gray-600/90 leading-relaxed font-medium">IRS-ready PDF, delivered instantly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div 
                className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.15),
                    0 10px 20px -8px rgba(0, 0, 0, 0.1),
                    0 4px 15px -3px rgba(0, 0, 0, 0.05)
                  `
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Why Signica rocks</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Shield, text: "Bank-level security & encryption" },
                    { icon: FileText, text: "IRS compliant form generation" },
                    { icon: Mail, text: "Automated email reminders" },
                    { icon: Zap, text: "Real-time status tracking" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <feature.icon className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div 
                className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.15),
                    0 10px 20px -8px rgba(0, 0, 0, 0.1),
                    0 4px 15px -3px rgba(0, 0, 0, 0.05)
                  `
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Need help?</h3>
                </div>
                
                <p className="text-gray-600/90 mb-6 leading-relaxed font-medium">
                  Questions about W-9 requests? <span className="text-gray-700">We're here to help.</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-primary/20 text-primary hover:border-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div 
                className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 relative overflow-hidden"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.25),
                    0 10px 20px -8px rgba(0, 0, 0, 0.15),
                    0 4px 15px -3px rgba(0, 0, 0, 0.1)
                  `
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple/5 to-pink/5 rounded-full blur-2xl"></div>

                <div className="relative">
                  <div className="mb-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Details</h3>
                    <p className="text-gray-600/90 font-medium">Enter vendor info to <span className="text-gray-700">launch request</span></p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div 
                      className="mb-6 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60"
                      style={{
                        boxShadow: `
                          0 10px 25px -5px rgba(239, 68, 68, 0.1),
                          0 4px 10px -2px rgba(239, 68, 68, 0.05)
                        `
                      }}
                    >
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Vendor Name Field */}
                    <div className="space-y-3">
                      <Label htmlFor="vendorName" className="text-sm font-semibold text-gray-900">
                        Vendor/Contractor Name
                      </Label>
                      <div className="relative">
                        <Input
                          id="vendorName"
                          type="text"
                          placeholder="Enter the full legal name"
                          className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-4 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                          value={vendorName}
                          onChange={(e) => setVendorName(e.target.value)}
                          required
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500/80 font-medium">Legal business or full name</p>
                    </div>

                    {/* Vendor Email Field */}
                    <div className="space-y-3">
                      <Label htmlFor="vendorEmail" className="text-sm font-semibold text-gray-900">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Input
                          id="vendorEmail"
                          type="email"
                          placeholder="vendor@company.com"
                          className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-4 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                          value={vendorEmail}
                          onChange={(e) => setVendorEmail(e.target.value)}
                          required
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500/80 font-medium">W-9 link destination</p>
                    </div>

                    {/* Send Request Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading || !vendorName || !vendorEmail}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-3 group-hover:translate-x-0.5 transition-transform" />
                            Send W-9 Request
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="pt-6 border-t border-gray-200/60">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">2min</div>
                          <div className="text-xs text-gray-500 font-medium">Average setup</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">99%</div>
                          <div className="text-xs text-gray-500 font-medium">Completion rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24h</div>
                          <div className="text-xs text-gray-500 font-medium">Average response</div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  )
}
