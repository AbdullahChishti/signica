import { Shield, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"

export default function FormW9Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted/30 px-4 py-16 md:px-6 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-none">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 max-w-8xl mx-auto">
              <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary self-center lg:self-start">
                    <Shield className="w-4 h-4 mr-2" />
                    IRS Compliant & Secure
                  </div>
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    W-9s Made<br />
                    <span className="text-primary">Ridiculously Simple</span>
                  </h1>
                  <p className="text-lg font-normal leading-relaxed text-muted-foreground max-w-xl lg:max-w-2xl">
                    Stop chasing vendors for tax forms. Signica automates the entire W-9 process—from request to download.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 self-center lg:self-start">
                  <Link href="/login" className="inline-flex items-center justify-center rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-8">
                    Get Started Today
                  </Link>
                  <Link href="/demo" className="inline-flex items-center justify-center rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary h-12 px-8">
                    View Demo
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-muted-foreground self-center lg:self-start">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10 border">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhgPWJj3QXjNqwRMAANFVOcDMf1aqj_ljhOUdqYxzECtERs7QRd8YWCWFLfBYA5ljvEoNUZh_gOOO-UuQVi6yI3wA7yrs8U74iz4I8FQtcLrNpXN08P2Gi1CHB6EhZT6hvQLA7OZ4VVqjyOrux5xqLsI4tSpv3WRrvDSJbRrJSfAoc6FDgNjRQNl7j0NbLRX_wk09ABHMGRAy2jvxoL-5nWQsj7sgjfwKCkY7dyycba1O6opsa7iMh7IWZd50bwZki_y_ufsxp9gNB"
                    alt="Form W9 App Dashboard"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 px-4 py-16 md:px-6 md:py-24" id="features">
          <div className="container mx-auto max-w-none">
            <div className="flex flex-col gap-10 text-center md:gap-12 max-w-8xl mx-auto">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary self-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Powerful Features
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  Three clicks.<br />
                  <span className="text-primary">Zero headaches.</span>
                </h2>
                <p className="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground lg:max-w-3xl">
                  Send requests, track progress, download forms. That's it. No more email chains or missing paperwork.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                <div className="group flex flex-col gap-6 rounded-2xl border bg-card p-8 text-left shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Shield className="h-7 w-7" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-foreground">Fort Knox Security</h3>
                    <p className="text-base font-normal leading-relaxed text-muted-foreground">
                      256-bit encryption and SOC 2 compliance. Your data is safer than your lunch in the office fridge.
                    </p>
                  </div>
                </div>

                <div className="group flex flex-col gap-6 rounded-2xl border bg-card p-8 text-left shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Users className="h-7 w-7" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-foreground">Actually User-Friendly</h3>
                    <p className="text-base font-normal leading-relaxed text-muted-foreground">
                      So simple, even your most tech-challenged vendor will breeze through it. No PhD required.
                    </p>
                  </div>
                </div>

                <div className="group flex flex-col gap-6 rounded-2xl border bg-card p-8 text-left shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <BarChart3 className="h-7 w-7" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold leading-tight text-foreground">Crystal Ball Insights</h3>
                    <p className="text-base font-normal leading-relaxed text-muted-foreground">
                      Real-time tracking and automated reports. Know exactly who's done and who needs a gentle nudge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Full Width */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto max-w-none px-4 md:px-6">
            <div className="flex flex-col items-center gap-6 text-center md:gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                  Ready to ditch the chaos?
                </h2>
                <p className="text-lg font-normal leading-relaxed text-white/90 max-w-2xl mx-auto">
                  Join thousands who've escaped W-9 madness. Setup takes 2 minutes, sanity restoration is immediate.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/login" className="inline-flex items-center justify-center rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-white/90 h-12 px-8 flex-1">
                  Get Started Free
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center rounded-lg text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white hover:text-primary h-12 px-8 flex-1">
                  View Demo
                </Link>
              </div>
              <p className="text-sm text-white/70 mt-2">
                No credit card required • Free 14-day trial
              </p>
            </div>
          </div>
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
