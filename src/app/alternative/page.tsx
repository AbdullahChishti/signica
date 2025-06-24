import { Shield, Users, BarChart3, Clock, Zap, Check } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"

export default function FormW9Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/10 px-4 py-20 md:py-28 lg:py-36">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,hsl(var(--primary)/0.03),transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,hsl(var(--primary)/0.05),transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit mx-auto lg:mx-0">
                    <Shield className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                    <span>IRS Compliant & Secure</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.15] bg-clip-text">
                      W-9s Made{' '}
                      <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        Ridiculously Simple
                      </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      Stop chasing vendors for tax forms. Signica automates the entire W-9 process—from request to download.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 ease-in-out bg-primary hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    Get Started Today
                  </Link>
                  <Link 
                    href="/demo" 
                    className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-200 ease-in-out border-2 border-muted-foreground/20 text-foreground hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:ring-2 focus:ring-primary/10 focus:ring-offset-2"
                  >
                    View Demo
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto lg:mx-0">
                  {[
                    { text: 'No setup fees', icon: '✓' },
                    { text: '14-day free trial', icon: '✓' },
                    { text: 'Cancel anytime', icon: '✓' },
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2.5 px-3 py-2 bg-muted/50 rounded-lg text-sm font-medium text-foreground/90 hover:bg-muted/80 transition-colors"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-border/30">
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-background/10 to-transparent z-10"></div>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhgPWJj3QXjNqwRMAANFVOcDMf1aqj_ljhOUdqYxzECtERs7QRd8YWCWFLfBYA5ljvEoNUZh_gOOO-UuQVi6yI3wA7yrs8U74iz4I8FQtcLrNpXN08P2Gi1CHB6EhZT6hvQLA7OZ4VVqjyOrux5xqLsI4tSpv3WRrvDSJbRrJSfAoc6FDgNjRQNl7j0NbLRX_wk09ABHMGRAy2jvxoL-5nWQsj7sgjfwKCkY7dyycba1O6opsa7iMh7IWZd50bwZki_y_ufsxp9gNB"
                    alt="Form W9 App Dashboard"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 -right-12 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -z-10 animate-blob animation-delay-4000"></div>
                
                {/* Floating UI elements */}
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-border/20 z-10 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium">Live Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 md:py-32 bg-muted/20 overflow-hidden" id="features">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,transparent,white,transparent)]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <BarChart3 className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
                Three clicks.
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Zero headaches.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Send requests, track progress, download forms. That's it. No more email chains or missing paperwork.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {[
                {
                  icon: <Shield className="h-7 w-7" />,
                  title: 'Enterprise Security',
                  description: '256-bit encryption and SOC 2 compliance ensure your data is protected with bank-level security measures.'
                },
                {
                  icon: <Users className="h-7 w-7" />,
                  title: 'User-Friendly',
                  description: 'Intuitive interface designed for all skill levels. No training required to get started.'
                },
                {
                  icon: <BarChart3 className="h-7 w-7" />,
                  title: 'Real-Time Analytics',
                  description: 'Track form completion status in real-time with our comprehensive dashboard.'
                },
                {
                  icon: <Clock className="h-7 w-7" />,
                  title: 'Time-Saving',
                  description: 'Automate reminders and follow-ups to eliminate manual tracking and chasing.'
                },
                {
                  icon: <Zap className="h-7 w-7" />,
                  title: 'Lightning Fast',
                  description: 'Process hundreds of W-9 requests simultaneously with our high-performance infrastructure.'
                },
                {
                  icon: <Check className="h-7 w-7" />,
                  title: 'IRS Compliant',
                  description: 'Automatically validate all submissions against IRS requirements to ensure full compliance.'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Full Width */}
        <section className="relative py-20 md:py-28 bg-gradient-to-r from-primary to-primary/90 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4">
                  Ready to simplify your W-9 process?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of businesses who've automated their tax form collection. Get started in minutes.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-primary bg-white hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus:ring-2 focus:ring-white/20 focus:ring-offset-2"
                >
                  Start Free Trial
                </Link>
                <Link 
                  href="/demo" 
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus:ring-2 focus:ring-white/10 focus:ring-offset-2"
                >
                  Schedule Demo
                </Link>
              </div>
              
              <p className="mt-6 text-sm text-white/70">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-none">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-foreground">Signica</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The smart way to collect W-9 forms. Trusted by thousands who value their time and sanity.
                </p>
              </div>

              {/* Product */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Product</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                  <Link href="/demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Demo
                  </Link>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                  <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Support</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    System Status
                  </Link>
                  <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    API Docs
                  </Link>
                </div>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Legal</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="/compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Compliance
                  </Link>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-muted-foreground/10">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Signica. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Made with ❤️ for businesses</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
