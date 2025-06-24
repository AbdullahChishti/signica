import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Shield, Send, Sparkles, Zap, Mail } from "lucide-react"
import Header from "@/components/Header"

export default function RequestSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          
          {/* Success Card */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-12 text-center relative overflow-hidden"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 10px 20px -8px rgba(0, 0, 0, 0.15),
                0 4px 15px -3px rgba(0, 0, 0, 0.1)
              `
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full blur-2xl"></div>

            <div className="relative">
              
              {/* Success Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100/80 to-emerald-100/80 border border-green-200/60 mb-8">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Mission accomplished</span>
              </div>

              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div 
                  className="w-24 h-24 rounded-3xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center"
                  style={{
                    boxShadow: `
                      0 10px 25px -5px rgba(34, 197, 94, 0.2),
                      0 4px 10px -2px rgba(34, 197, 94, 0.1)
                    `
                  }}
                >
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  W-9 Request
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                    Launched! 🚀
                  </span>
                </h1>
                <p className="text-xl text-gray-600/90 max-w-lg mx-auto font-medium leading-relaxed">
                  Secure link delivered. <span className="text-gray-700">Your vendor will receive it shortly.</span>
                </p>
              </div>

              {/* What Happens Next */}
              <div className="mb-12 text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What happens next?</h2>
                <div className="space-y-6">
                  
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Direct link delivered</h3>
                      <p className="text-gray-600/90 font-medium">Secure email with personalized access</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">One-click completion</h3>
                      <p className="text-gray-600/90 font-medium">No signup required, instant access</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-10 h-10 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                    >
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Instant notification</h3>
                      <p className="text-gray-600/90 font-medium">IRS-ready PDF, delivered to you</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/admin">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                  >
                    <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Dashboard
                  </Button>
                </Link>

                <Link href="/admin/request">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary px-8 py-4 rounded-2xl transition-all duration-200"
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Send Another
                  </Button>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">2min</div>
                  <div className="text-xs text-gray-500/80 font-medium">Average completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">99%</div>
                  <div className="text-xs text-gray-500/80 font-medium">Success rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">30d</div>
                  <div className="text-xs text-gray-500/80 font-medium">Valid until</div>
                </div>
              </div>

              {/* Security Notice */}
              <div 
                className="pt-6 border-t border-gray-200/60 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-2xl p-4"
                style={{
                  boxShadow: `0 4px 10px -2px rgba(34, 197, 94, 0.1)`
                }}
              >
                <div className="flex items-center justify-center space-x-3 text-sm">
                  <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-green-700 font-medium">
                    Bank-level encryption • 30-day validity • <span className="text-green-800">Fully secure</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
