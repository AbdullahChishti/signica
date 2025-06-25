'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Mail, Users, Lock, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { createW9Request, generateDirectFormLink } from "@/lib/database"
import { RequireAuth } from "@/components/AuthGuard"
import Header from "@/components/Header"
import { ButtonLoader } from "@/components/ui/loader"

export default function RequestW9Form() {
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendorName || !vendorEmail || !user) return

    setIsLoading(true)
    setError('')

    try {
      const request = await createW9Request(vendorName, vendorEmail, user.id)
      await generateDirectFormLink(request.id)
      
      try {
        const emailResponse = await fetch('/api/send-w9-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestId: request.id, vendorName, vendorEmail }),
        })
        if (!emailResponse.ok) {
          const emailResult = await emailResponse.json()
          throw new Error(emailResult.error || 'Failed to send email')
        }
      } catch (emailError) {
        // Non-critical error
        console.error('Email sending failed:', emailError)
      }

      router.push('/request/success')
    } catch (error: any) {
      setError(error.message || 'Failed to create W9 request')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { text: "IRS-compliant W-9 forms." },
    { text: "Bank-level 256-bit encryption." },
    { text: "No vendor sign-up required." },
    { text: "Automated email reminders." },
  ]

  return (
    <RequireAuth>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center py-16 px-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Info & Features */}
            <div className="flex flex-col gap-8 text-center lg:text-left">
              <div>
                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900">
                  The new standard for W-9 collection.
                </h1>
                <p className="mt-5 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Onboard vendors, collect tax forms, and stay compliant with a process that's fast, secure, and professional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form Card */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-2xl shadow-blue-500/20 p-8">
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
                  Create a New Request
                </h2>
                <p className="text-slate-600 text-center mb-8">
                  Your vendor will receive a secure link to fill out their W-9.
                </p>
                
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-100/50 border border-red-200 text-red-800 text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      id="vendorName"
                      type="text"
                      value={vendorName}
                      onChange={e => setVendorName(e.target.value)}
                      className="peer w-full px-4 py-3 rounded-lg border border-slate-300/40 bg-white/70 backdrop-blur-sm text-slate-900 placeholder-transparent shadow-sm focus:bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium text-base pl-11 outline-none"
                      placeholder="Vendor or Business Name"
                      required
                    />
                    <Label htmlFor="vendorName" className="absolute left-11 -top-2.5 text-xs font-medium text-slate-600 bg-gray-50 peer-placeholder-shown:bg-transparent peer-placeholder-shown:left-11 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base pointer-events-none transition-all duration-300 px-1 rounded-md peer-focus:bg-gray-50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                      Vendor or Business Name
                    </Label>
                    <Users className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 peer-focus:text-blue-500 transition-colors duration-300" />
                  </div>

                  <div className="relative">
                    <Input
                      id="vendorEmail"
                      type="email"
                      value={vendorEmail}
                      onChange={e => setVendorEmail(e.target.value)}
                      className="peer w-full px-4 py-3 rounded-lg border border-slate-300/40 bg-white/70 backdrop-blur-sm text-slate-900 placeholder-transparent shadow-sm focus:bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium text-base pl-11 outline-none"
                      placeholder="Vendor Contact Email"
                      required
                    />
                    <Label htmlFor="vendorEmail" className="absolute left-11 -top-2.5 text-xs font-medium text-slate-600 bg-gray-50 peer-placeholder-shown:bg-transparent peer-placeholder-shown:left-11 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base pointer-events-none transition-all duration-300 px-1 rounded-md peer-focus:bg-gray-50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600">
                      Vendor Contact Email
                    </Label>
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 peer-focus:text-blue-500 transition-colors duration-300" />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold py-3.5 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group text-base flex items-center justify-center focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <ButtonLoader />
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2.5" />
                        Send Secure Request
                      </>
                    )}
                  </Button>
                </form>
                <div className="mt-8 text-center text-xs text-slate-600">
                  <p className="flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    All information is transmitted securely with 256-bit encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  )
}
