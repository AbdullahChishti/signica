'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Sparkles, Mail, Shield, Zap, Clock, CheckCircle, HelpCircle, FileText, Users, Lock, Verified, Globe } from "lucide-react"
import Link from "next/link"
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

      // Send email with direct form link to vendor
      try {
        const emailResponse = await fetch('/api/send-w9-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestId: request.id,
            vendorName,
            vendorEmail,
          }),
        })

        const emailResult = await emailResponse.json()

        if (!emailResponse.ok) {
          throw new Error(emailResult.error || 'Failed to send email')
        }

        console.log('✅ Email sent successfully:', emailResult)
      } catch (emailError) {
        console.error('⚠️ Email sending failed:', emailError)
        // Don't fail the entire request if email fails
        // The form link is still valid and can be shared manually
      }

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Glassmorphic floating blurs & mesh background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-emerald-200/20 to-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04)_0%,transparent_70%)]"></div>
        </div>
        <Header />
        <main className="relative min-h-[80vh] flex flex-col lg:flex-row items-stretch justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/40 overflow-hidden">
          {/* Animated mesh/blur background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-200/40 to-cyan-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-200/30 to-blue-100/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06)_0%,transparent_70%)]"></div>
          </div>
          {/* Left: Mission Control Visual Panel */}
          <section className="relative z-10 flex-1 flex flex-col justify-between px-6 py-12 lg:py-20 max-w-xl mx-auto lg:mx-0">
            {/* Hero */}
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/60 backdrop-blur border border-white/30 shadow mb-8">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-base font-semibold text-slate-800 tracking-wide">Mission Control</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                Launch a <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500 bg-clip-text text-transparent">W-9 Mission</span>
              </h1>
              <p className="text-lg text-slate-700/90 font-light mb-10 max-w-md">
                Securely request W-9s from vendors in seconds. <span className="text-gray-700 font-medium">Enterprise-grade, effortless, encrypted.</span>
              </p>
            </div>
            {/* Stepper */}
            <div className="flex flex-col items-start gap-0 relative pl-2 mb-10">
              <div className="absolute left-6 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-200 via-cyan-200 to-emerald-200 opacity-60 rounded-full"></div>
              {[
                { icon: Mail, title: "Send Secure Link", desc: "Personalized W-9 request sent instantly." },
                { icon: Shield, title: "Bank-Grade Security", desc: "Encrypted, IRS-compliant, zero friction." },
                { icon: CheckCircle, title: "Get IRS-Ready PDF", desc: "Completed W-9 delivered to your dashboard." }
              ].map((step, i) => (
                <div key={i} className="flex items-center mb-8 last:mb-0 relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${i === 0 ? 'from-blue-600 to-cyan-500' : i === 1 ? 'from-cyan-500 to-emerald-400' : 'from-emerald-400 to-blue-400'} text-white mr-5`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 mb-1">{step.title}</div>
                    <div className="text-sm text-slate-600 font-medium">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Trust badges row */}
            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-white/30 shadow-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-slate-700">256-bit Encrypted</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-white/30 shadow-sm">
                <Verified className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">SOC 2</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur border border-white/30 shadow-sm">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">GDPR Ready</span>
              </div>
            </div>
          </section>
          {/* Right: Floating Glassmorphic Form Card */}
          <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-12 lg:py-20">
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating blur accents */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-blue-200/30 to-cyan-200/20 rounded-full blur-2xl opacity-40"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-tr from-emerald-200/20 to-blue-100/20 rounded-full blur-2xl opacity-30"></div>
              <div className="bg-white/90 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-10 shadow-2xl relative overflow-visible">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Request Details</h2>
                {error && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60 text-red-700 text-center font-medium">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <Label htmlFor="vendorName" className="block text-base font-semibold text-slate-900 mb-2">Vendor Name</Label>
                    <div className="relative">
                      <Input
                        id="vendorName"
                        type="text"
                        value={vendorName}
                        onChange={e => setVendorName(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium text-lg pl-12"
                        placeholder="Acme Corporation"
                        required
                      />
                      <Users className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="vendorEmail" className="block text-base font-semibold text-slate-900 mb-2">Vendor Email</Label>
                    <div className="relative">
                      <Input
                        id="vendorEmail"
                        type="email"
                        value={vendorEmail}
                        onChange={e => setVendorEmail(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm text-slate-900 placeholder-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg font-medium text-lg pl-12"
                        placeholder="vendor@email.com"
                        required
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg flex items-center justify-center animate-glow"
                  >
                    {isLoading ? (
                      <>
                        <ButtonLoader size="sm" />
                        Launching Mission...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        Launch Mission
                      </>
                    )}
                  </Button>
                </form>
                {/* Stat/Badge below form */}
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-100/60 to-cyan-100/60 border border-blue-200/40 text-blue-700 font-semibold text-sm shadow-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    99% Completion Rate
                  </div>
                </div>
              </div>
              {/* Support link below form */}
              <div className="mt-6 text-center">
                <Link href="/support" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium">
                  <Users className="w-4 h-4" />
                  Need help? Contact support
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </RequireAuth>
  )
}
