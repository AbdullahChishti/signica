'use client'

import { Shield, ArrowRight, CheckCircle, Eye, Lock, Verified, Globe, Edit3, Send, Check, Star, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Glassmorphic Floating Blurs & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-emerald-200/20 to-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.04)_0%,transparent_70%)]"></div>
      </div>
      <Header />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/30 shadow mb-8">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-slate-700">256-bit Encrypted</span>
              <span className="mx-2 text-slate-300">|</span>
              <Verified className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">IRS Compliant</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-500 bg-clip-text text-transparent">Modern W-9 Forms</span>
              <span className="block text-slate-800/80 font-light mt-2">for Secure, Effortless Compliance</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
              Collect, validate, and store W-9s with glassmorphic security and a professional, minimal experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg">
                  Get Started
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="border-2 border-slate-300 bg-white/70 backdrop-blur-md hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-12 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group text-lg">
                  <Eye className="w-6 h-6 mr-3" />
                  See Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Edit3,
                title: "Auto-Fill & Validation",
                desc: "Smart, secure data entry with instant IRS checks."
              },
              {
                icon: Lock,
                title: "Bank-Grade Security",
                desc: "All data encrypted in transit and at rest."
              },
              {
                icon: Send,
                title: "Effortless Sharing",
                desc: "One-click send, track, and store—all in one place."
              }
            ].map((f, i) => (
              <div key={i} className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-lg flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100/60 to-cyan-100/60 flex items-center justify-center mb-4 shadow">
                  <f.icon className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-base font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Trust/Compliance Badges */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-3xl flex flex-wrap justify-center gap-6">
            {[
              { icon: Verified, label: "IRS Compliant" },
              { icon: Lock, label: "SOC 2 Certified" },
              { icon: Globe, label: "GDPR Ready" },
              { icon: CheckCircle, label: "99.9% Uptime" }
            ].map((b, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 shadow text-slate-700 font-semibold">
                <b.icon className="w-5 h-5 text-blue-600" />
                {b.label}
              </div>
            ))}
          </div>
        </section>
        {/* Testimonial & Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl flex flex-col items-center text-center">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-800 mb-6 font-medium italic max-w-xl">
                “Cut our W-9 collection time from weeks to minutes. The security and simplicity are unmatched.”
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-bold">SJ</div>
                <div className="text-left">
                  <div className="font-bold text-slate-900">Sarah Johnson</div>
                  <div className="text-sm text-slate-600">Finance Director, TechCorp</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 w-full">
                {[
                  { stat: "50K+", label: "Forms Processed" },
                  { stat: "500+", label: "Active Businesses" },
                  { stat: "99.9%", label: "Uptime" },
                  { stat: "24/7", label: "Support" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-blue-700 mb-1">{s.stat}</div>
                    <div className="text-slate-600 text-sm font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-xl text-center">
            <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-xl flex flex-col items-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to Go Digital?</h2>
              <p className="text-lg text-slate-600 mb-8">Join hundreds of businesses streamlining their W-9 process with SecureW9.</p>
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg">
                  Start Free Trial
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Minimal Glassy Footer */}
      <footer className="border-t border-white/30 py-10 px-4 bg-white/40 backdrop-blur-xl relative">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" />
            <span className="font-bold text-slate-900">SecureW9</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <div>© 2024 SecureW9. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
