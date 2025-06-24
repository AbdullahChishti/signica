import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ExternalLink, Users, FileText, Home } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">TaxForms Demo Navigation</h1>
          <p className="text-lg text-gray-600">
            Explore all the pages and features of the TaxForms application
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Landing Page */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Home className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Landing Page</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Marketing homepage with features, pricing, and call-to-action buttons.
            </p>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Landing Page
              </Button>
            </Link>
          </div>

          {/* Admin Dashboard */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Admin Dashboard</h3>
            </div>
            <p className="text-gray-600 mb-4">
              View all W-9 requests, track completion status, and manage vendors.
            </p>
            <Link href="/admin">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Request Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Request W-9</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Create new W-9 requests by entering vendor name and email address.
            </p>
            <Link href="/admin/request">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Create Request
              </Button>
            </Link>
          </div>

          {/* W-9 Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">W-9 Form</h3>
            </div>
            <p className="text-gray-600 mb-4">
              The form that vendors/candidates fill out with their tax information.
            </p>
            <Link href="/form/demo">
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Fill Out Form
              </Button>
            </Link>
          </div>

          {/* Demo Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ExternalLink className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Demo Page</h3>
            </div>
            <p className="text-gray-600 mb-4">
              This page - central navigation hub for exploring all features.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Current Page
            </Button>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Typical Workflow</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#4793ea' }}>
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admin creates request</h3>
                  <p className="text-gray-600">Go to "Request W-9" page and enter vendor details</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#4793ea' }}>
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">System sends email</h3>
                  <p className="text-gray-600">Vendor receives email with unique link to W-9 form</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#4793ea' }}>
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Vendor fills form</h3>
                  <p className="text-gray-600">Vendor completes W-9 form with tax information and signature</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#4793ea' }}>
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admin sees completion</h3>
                  <p className="text-gray-600">Dashboard updates to show "Completed" status for the request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
