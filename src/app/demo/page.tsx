import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import { ExternalLink, Users, FileText, Home } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <Header />

      <main className="container mx-auto px-6 py-12 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            <ExternalLink className="w-4 h-4 mr-2" />
            Interactive Demo
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl mb-6">
            Explore Signica
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a spin through our W-9 platform. See how we turn tax form chaos into organized bliss.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {/* Landing Page */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Landing Page</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional marketing homepage showcasing features, benefits, and compelling call-to-action sections.
            </p>
            <Link href="/">
              <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Landing Page
              </Button>
            </Link>
          </div>

          {/* Admin Dashboard */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Admin Dashboard</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Comprehensive dashboard to view all W-9 requests, track completion status, and manage vendor relationships.
            </p>
            <Link href="/admin">
              <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Request Form */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Request W-9</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Streamlined form to create new W-9 requests by entering vendor details and sending secure invitations.
            </p>
            <Link href="/admin/request">
              <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Request
              </Button>
            </Link>
          </div>

          {/* W-9 Form */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">W-9 Form</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Interactive W-9 form that vendors complete with their tax information, including digital signature options.
            </p>
            <Link href="/form/demo">
              <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 mr-2" />
                Fill Out Form
              </Button>
            </Link>
          </div>

          {/* Success Pages */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Success Pages</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Confirmation pages that provide clear next steps and download options after form completion.
            </p>
            <Link href="/request/success">
              <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Success Page
              </Button>
            </Link>
          </div>

          {/* Demo Navigation */}
          <div className="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Demo Hub</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This page - your central navigation hub for exploring all features and understanding the complete workflow.
            </p>
            <Button variant="outline" className="w-full rounded-xl border-2 border-muted-foreground/20 text-muted-foreground cursor-not-allowed" disabled>
              Current Page
            </Button>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="rounded-2xl border bg-card shadow-large overflow-hidden">
          <div className="bg-primary/5 px-8 py-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground text-center">Complete Workflow</h2>
            <p className="text-muted-foreground text-center mt-2">Follow the typical process from request to completion</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Admin Creates Request</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Navigate to the "Request W-9" page and enter vendor details including name and email address.
                    The system validates the information and prepares the secure invitation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Secure Email Delivery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The vendor receives a professionally formatted email with a unique, secure link to their personalized W-9 form.
                    The link expires after 30 days for security.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Form Completion</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vendor completes the intuitive W-9 form with their tax information, address details, and digital signature.
                    All data is encrypted and validated in real-time.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Instant Notification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dashboard automatically updates to show "Completed" status. Admin receives notification and can
                    immediately download the completed, IRS-compliant W-9 form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
