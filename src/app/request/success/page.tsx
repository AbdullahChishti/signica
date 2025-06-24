import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Shield, Send, Bell, Download } from "lucide-react"

export default function RequestSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Form W9 App</span>
            </Link>

            <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Request Sent
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 md:px-8 lg:py-20">
        <div className="w-full max-w-2xl">
          {/* Success Card */}
          <div className="relative overflow-hidden rounded-2xl bg-card border shadow-large p-8 md:p-12 text-center">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

            <div className="relative">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
                  W-9 Request Sent Successfully!
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Your W-9 request has been sent to the vendor. They will receive an email with instructions to complete their form.
                </p>
              </div>

              {/* What Happens Next */}
              <div className="mb-8 text-left">
                <h2 className="text-xl font-semibold text-foreground mb-6 text-center">What happens next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Delivered</h3>
                      <p className="text-sm text-muted-foreground">The vendor receives a secure email with a personalized W-9 form link</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Form Completion</h3>
                      <p className="text-sm text-muted-foreground">They complete the W-9 form online with bank-level security</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Instant Notification</h3>
                      <p className="text-sm text-muted-foreground">You receive immediate notification and can download the completed form</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Link href="/admin">
                  <Button className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-8 w-full max-w-sm mx-auto">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>

                <Link href="/admin/request">
                  <Button variant="outline" className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary h-12 px-8 w-full max-w-sm mx-auto">
                    <Send className="w-5 h-5 mr-2" />
                    Send Another Request
                  </Button>
                </Link>
              </div>

              {/* Footer Notice */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>The vendor will have 30 days to complete their W-9 form. All data is encrypted and secure.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
