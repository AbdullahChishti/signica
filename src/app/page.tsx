import { Shield, ArrowRight, Zap, Users, CheckCircle, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Trusted by 1000+ businesses</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                W-9 forms made
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  beautifully simple
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-600/90 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
                Send, collect, manage W-9s. 
                <span className="text-gray-700"> Zero hassle.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    Start for free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary px-8 py-4 rounded-xl transition-all duration-200"
                  >
                    Watch demo
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500/80">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">4.9/5 from 200+ reviews</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-4xl mx-auto">
              <div 
                className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 shadow-2xl"
                style={{
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.25),
                    0 10px 20px -8px rgba(0, 0, 0, 0.15),
                    0 4px 15px -3px rgba(0, 0, 0, 0.1)
                  `
                }}
              >
                {/* Mock Dashboard Preview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">W-9 Command Center</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">18</div>
                      <div className="text-sm text-blue-600/70">Total Requests</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">15</div>
                      <div className="text-sm text-green-600/70">Completed</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">3</div>
                      <div className="text-sm text-amber-600/70">Pending</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Acme Corp", status: "completed", email: "finance@acme.com" },
                      { name: "TechStart Inc", status: "pending", email: "admin@techstart.io" },
                      { name: "Global Solutions", status: "completed", email: "contact@global.com" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.email}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need
              </h2>
              <p className="text-xl text-gray-600/90 max-w-lg mx-auto font-medium">
                W-9 collection, <span className="text-gray-700">reimagined</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning fast",
                  description: "Minutes, not days"
                },
                {
                  icon: Shield,
                  title: "Bank-level security",
                  description: "256-bit SSL encryption"
                },
                {
                  icon: Users,
                  title: "Zero friction",
                  description: "No accounts required"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-600/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600/90 font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 bg-gradient-to-br from-gray-50/50 to-gray-100/50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <p className="text-xl text-gray-600/90 font-medium">
                Three steps to <span className="text-gray-700">W-9 success</span>
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Send request",
                  description: "Enter details, we handle the rest"
                },
                {
                  step: "02", 
                  title: "They complete",
                  description: "One-click form completion"
                },
                {
                  step: "03",
                  title: "You download",
                  description: "IRS-ready PDF, instantly"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600/90 text-lg font-medium">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 backdrop-blur-sm text-green-700 text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Free forever • 5 requests per month
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to escape
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                W-9 chaos?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600/90 mb-10 max-w-lg mx-auto font-medium">
              Join 1000+ businesses using <span className="text-gray-700">Signica</span>
            </p>

            <Link href="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group text-lg"
              >
                Start for free today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500/80 mt-4 font-medium">
              No credit card • 2min setup
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 py-12 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Signica</span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-600/80 font-medium">
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="/support" className="hover:text-gray-900 transition-colors">Support</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200/60 mt-8 pt-8 text-center text-sm text-gray-500/80 font-medium">
            © 2024 Signica. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
