'use client'

import { Shield, ArrowRight, Zap, Users, CheckCircle, Sparkles, Star, Clock, Download, Eye, Rocket, Building2, TrendingUp, Mail, FileText, BarChart3, Lock, Verified, Globe, Edit3, Send, Check, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-slate-100/30 to-blue-100/30 rounded-full blur-3xl opacity-25"></div>
        
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02)_0%,transparent_50%)]"></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-24 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg mb-8 hover:shadow-xl transition-all duration-300">
                <Verified className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-700">IRS Compliant</span>
                <div className="w-1 h-5 bg-slate-300"></div>
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Bank-Level Security</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Digital W-9 Forms
                <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800 bg-clip-text text-transparent block">
                  Made Simple
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Transform your W-9 process with our secure digital platform. 
                <span className="text-slate-800 font-semibold"> Faster collection, instant validation, and seamless compliance.</span>
              </p>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg"
                  >
                    Start Digital W-9
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-12 py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group text-lg"
                  >
                    <Eye className="w-6 h-6 mr-3" />
                    View Demo
                  </Button>
                </Link>
              </div>

              {/* Time Savings Stat */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 shadow-sm">
                <Timer className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">Save 85% of time vs. paper forms</span>
              </div>
            </div>

            {/* Hero Visual - Digital Form Interface */}
            <div className="relative max-w-5xl mx-auto">
              <div 
                className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-700"
                style={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Digital W-9 Form Preview */}
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center justify-center shadow-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl">Form W-9 Digital</h3>
                        <p className="text-sm text-slate-500">Request for Taxpayer Identification</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200/50">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-700">Auto-Validated</span>
                    </div>
                  </div>
                  
                  {/* Form Fields Preview */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50/80 backdrop-blur-sm border border-slate-200/50">
                        <label className="text-sm font-semibold text-slate-700 block mb-2">Business Name</label>
                        <div className="text-slate-900 font-medium">Acme Corporation LLC</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50/80 backdrop-blur-sm border border-slate-200/50">
                        <label className="text-sm font-semibold text-slate-700 block mb-2">Federal Tax Classification</label>
                        <div className="text-slate-900 font-medium">Limited Liability Company</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-50/80 backdrop-blur-sm border border-slate-200/50">
                        <label className="text-sm font-semibold text-slate-700 block mb-2">EIN</label>
                        <div className="text-slate-900 font-medium">12-3456789</div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50/80 backdrop-blur-sm border border-slate-200/50">
                        <label className="text-sm font-semibold text-slate-700 block mb-2">Address</label>
                        <div className="text-slate-900 font-medium">123 Business Ave, Suite 100</div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Signature Area */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Digital Signature</h4>
                        <p className="text-sm text-slate-600">Legally binding electronic signature</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm">
                          <span className="text-sm font-medium text-slate-700">John Smith</span>
                        </div>
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Security Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 via-white/20 to-blue-100/40"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Trusted & Secure
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Your data is protected with enterprise-grade security and full IRS compliance
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "256-bit Encryption", desc: "Bank-level security" },
                { icon: Verified, title: "IRS Compliant", desc: "Meets all requirements" },
                { icon: Lock, title: "SOC 2 Certified", desc: "Audited security controls" },
                { icon: Globe, title: "GDPR Ready", desc: "Data protection compliant" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div 
                    className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    style={{ backdropFilter: 'blur(10px)' }}
                  >
                    <item.icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need to digitalize and manage W-9 forms efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Edit3,
                  title: "Auto-Fill Capabilities",
                  description: "Smart form completion using business databases and previous submissions",
                  benefits: ["Reduce data entry by 90%", "Eliminate typing errors", "Pre-populate from databases"]
                },
                {
                  icon: CheckCircle,
                  title: "Instant Validation",
                  description: "Real-time verification of tax IDs, business information, and form completeness",
                  benefits: ["Validate EIN instantly", "Check business status", "Ensure form accuracy"]
                },
                {
                  icon: Send,
                  title: "Easy Sharing & Storage",
                  description: "Secure document sharing with automated storage and retrieval systems",
                  benefits: ["One-click sharing", "Automatic backups", "Searchable archive"]
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 group hover:shadow-2xl transition-all duration-500 shadow-lg"
                  style={{ backdropFilter: 'blur(15px)' }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-slate-900 mb-6">
                Measurable Benefits
              </h2>
              <p className="text-xl text-slate-600">
                See the immediate impact on your business processes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  {
                    metric: "85%",
                    title: "Time Savings",
                    description: "Complete W-9 collection in minutes instead of weeks"
                  },
                  {
                    metric: "95%",
                    title: "Error Reduction",
                    description: "Eliminate common mistakes with automated validation"
                  },
                  {
                    metric: "100%",
                    title: "Compliance Rate",
                    description: "Meet all IRS requirements with built-in compliance checks"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div 
                      className="w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{ backdropFilter: 'blur(10px)' }}
                    >
                      <span className="text-2xl font-bold text-blue-700">{benefit.metric}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-2xl"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Process Comparison</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-red-50/80">
                    <span className="font-medium text-slate-900">Paper Forms</span>
                    <span className="text-red-600 font-bold">2-3 weeks</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-emerald-50/80">
                    <span className="font-medium text-slate-900">Digital W-9</span>
                    <span className="text-emerald-600 font-bold">5 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Trusted by Businesses
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  quote: "Cut our W-9 collection time from weeks to minutes. The validation features caught errors we never would have noticed.",
                  author: "Sarah Johnson",
                  role: "Finance Director",
                  company: "TechCorp Solutions"
                },
                {
                  quote: "The digital signature integration made vendor onboarding seamless. Our compliance team loves the audit trail.",
                  author: "Michael Chen", 
                  role: "Procurement Manager",
                  company: "Global Manufacturing"
                },
                {
                  quote: "Finally, a W-9 solution that actually works. Clean interface, fast processing, and bulletproof security.",
                  author: "Lisa Rodriguez",
                  role: "Operations Lead", 
                  company: "Financial Services Inc"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500"
                  style={{ backdropFilter: 'blur(15px)' }}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 font-medium italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{testimonial.author}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                      <div className="text-sm text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Usage Statistics */}
            <div 
              className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl text-center"
              style={{ backdropFilter: 'blur(20px)' }}
            >
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">50K+</div>
                  <div className="text-slate-600 font-medium">Forms Processed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">500+</div>
                  <div className="text-slate-600 font-medium">Active Businesses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">99.9%</div>
                  <div className="text-slate-600 font-medium">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">24/7</div>
                  <div className="text-slate-600 font-medium">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/5 to-indigo-700/5"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Ready to Go Digital?
            </h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Join hundreds of businesses streamlining their W-9 process with our secure digital platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-12 py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-500 font-medium">
              No credit card required • 30-day free trial • Setup in 5 minutes
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/40 py-16 px-4 bg-white/60 backdrop-blur-xl relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-slate-900 text-xl">Digital W-9</span>
              </div>
              <p className="text-slate-600 text-sm">
                Simplifying tax compliance with secure digital forms
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/features" className="hover:text-slate-900 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-slate-900 transition-colors">Demo</Link></li>
                <li><Link href="/api" className="hover:text-slate-900 transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/security" className="hover:text-slate-900 transition-colors">Security Overview</Link></li>
                <li><Link href="/compliance" className="hover:text-slate-900 transition-colors">Compliance</Link></li>
                <li><Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/help" className="hover:text-slate-900 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</Link></li>
                <li><Link href="/status" className="hover:text-slate-900 transition-colors">System Status</Link></li>
                <li><Link href="/resources" className="hover:text-slate-900 transition-colors">Resources</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200/60 pt-8 text-center text-sm text-slate-500">
            © 2024 Digital W-9. All rights reserved. IRS compliant • SOC 2 certified • GDPR ready
          </div>
        </div>
      </footer>
    </div>
  )
}
