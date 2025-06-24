"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Shield, User, CreditCard, MapPin, PenTool, Sparkles, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { getW9RequestById, submitW9FormData } from "@/lib/database"
import type { W9Request } from "@/lib/supabase"
import Header from "@/components/Header"
import { PageLoader, ButtonLoader } from "@/components/ui/loader"

export default function W9FormCompletion({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState({
    legalName: "",
    businessName: "",
    taxClassification: "",
    ssnEin: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    signature: "",
  })
  const [request, setRequest] = useState<W9Request | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [signatureType, setSignatureType] = useState<'typed' | 'drawn'>('typed')
  const [isDirectAccess, setIsDirectAccess] = useState(false)
  const router = useRouter()

  // Check for direct access and load W9 request data
  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params
      checkDirectAccessAndLoadRequest(resolvedParams.id)
    }
    loadData()
  }, [params])

  const checkDirectAccessAndLoadRequest = async (requestId: string) => {
    try {
      setLoading(true)
      setError('')

      // Check if this is direct access (no authentication required)
      const urlParams = new URLSearchParams(window.location.search)
      const isDirect = urlParams.get('direct') === 'true'
      setIsDirectAccess(isDirect)

      const requestData = await getW9RequestById(requestId)

      if (!requestData) {
        setError('W-9 request not found or has expired')
        return
      }

      if (requestData.status === 'completed') {
        setError('This W-9 form has already been completed')
        return
      }

      if (requestData.status === 'expired') {
        setError('This W-9 request has expired')
        return
      }

      // For direct access, no authentication needed - just validate the request exists
      setRequest(requestData)
    } catch (error: any) {
      console.error('Error loading request:', error)
      setError('Failed to load W-9 request')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!request || submitting) return

    // Validate required fields
    const requiredFields = ['legalName', 'taxClassification', 'ssnEin', 'streetAddress', 'city', 'state', 'zipCode', 'signature']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      setError('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      await submitW9FormData({
        request_id: request.id,
        legal_name: formData.legalName,
        business_name: formData.businessName || undefined,
        tax_classification: formData.taxClassification,
        ssn_ein: formData.ssnEin,
        street_address: formData.streetAddress,
        apartment: formData.apartment || undefined,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        signature: formData.signature,
        signature_type: signatureType
      })

      // Redirect to success page
      router.push('/form/success')
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setError(error.message || 'Failed to submit form')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <PageLoader text="Loading W-9 form..." />
    )
  }

  if (error && !request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div 
          className="bg-white/90 backdrop-blur-sm border border-red-200/60 rounded-3xl p-12 text-center max-w-md mx-auto"
          style={{
            boxShadow: `
              0 25px 50px -12px rgba(239, 68, 68, 0.25),
              0 10px 20px -8px rgba(239, 68, 68, 0.15),
              0 4px 15px -3px rgba(239, 68, 68, 0.1)
            `
          }}
        >
          <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Form</h1>
          <p className="text-gray-600/90 mb-8 font-medium">{error}</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-8 py-3 rounded-2xl">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">IRS Form W-9</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Complete Your
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                W-9 Information
              </span>
            </h1>
            
            <p className="text-xl text-gray-600/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Secure tax form for <span className="text-gray-700 font-semibold">{request?.vendor_name || 'the requesting company'}</span>. 
              <span className="text-gray-700"> All information encrypted.</span>
            </p>
          </div>

          {/* Form Card */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl overflow-hidden relative"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 10px 20px -8px rgba(0, 0, 0, 0.15),
                0 4px 15px -3px rgba(0, 0, 0, 0.1)
              `
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"></div>

            {/* Header */}
            <div 
              className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/50 relative"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tax Information Form</h2>
                  <p className="text-gray-600/90 font-medium">Complete all required fields below</p>
                </div>
                <div 
                  className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-green-100/80 border border-green-200/60"
                  style={{
                    boxShadow: `0 4px 12px -2px rgba(34, 197, 94, 0.1)`
                  }}
                >
                  <Lock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">Secure & Encrypted</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 relative">
              {/* Error Message */}
              {error && (
                <div 
                  className="mb-8 p-6 rounded-2xl bg-red-50/80 backdrop-blur-sm border border-red-200/60"
                  style={{
                    boxShadow: `
                      0 10px 25px -5px rgba(239, 68, 68, 0.1),
                      0 4px 10px -2px rgba(239, 68, 68, 0.05)
                    `
                  }}
                >
                  <p className="text-red-700 font-semibold">{error}</p>
                </div>
              )}

              <form className="space-y-12" onSubmit={handleSubmit}>
                
                {/* Personal Information Section */}
                <div 
                  className="bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-3xl p-8"
                  style={{
                    boxShadow: `
                      0 20px 40px -12px rgba(0, 0, 0, 0.1),
                      0 8px 16px -6px rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center mr-4"
                      style={{
                        boxShadow: `0 6px 15px -3px rgba(99, 102, 241, 0.15)`
                      }}
                    >
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                      <p className="text-gray-600/90 font-medium">Your legal name and business details</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Legal Name */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">
                        Legal Name (First, Middle, Last) *
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter your full legal name as it appears on tax return"
                        value={formData.legalName}
                        onChange={(e) => handleInputChange("legalName", e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                      />
                      <p className="text-sm text-gray-500/80 mt-2 font-medium">Must match your tax return exactly</p>
                    </div>

                    {/* Business Name */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">
                        Business Name <span className="text-gray-500 font-normal">(if different from above)</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter business name (optional)"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                      />
                      <p className="text-sm text-gray-500/80 mt-2 font-medium">Only if different from legal name</p>
                    </div>
                  </div>
                </div>

                {/* Tax Information Section */}
                <div 
                  className="bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-3xl p-8"
                  style={{
                    boxShadow: `
                      0 20px 40px -12px rgba(0, 0, 0, 0.1),
                      0 8px 16px -6px rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mr-4"
                      style={{
                        boxShadow: `0 6px 15px -3px rgba(168, 85, 247, 0.15)`
                      }}
                    >
                      <CreditCard className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Tax Classification</h3>
                      <p className="text-gray-600/90 font-medium">Federal tax filing information</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Tax Classification */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">
                        Federal Tax Classification *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("taxClassification", value)}>
                        <SelectTrigger className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg">
                          <SelectValue placeholder="Select your tax classification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                          <SelectItem value="c-corp">C Corporation</SelectItem>
                          <SelectItem value="s-corp">S Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                          <SelectItem value="other">Other (please specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500/80 mt-2 font-medium">Choose your business structure</p>
                    </div>

                    {/* SSN or EIN */}
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">
                        Taxpayer Identification Number *
                      </Label>
                      <Input
                        type="text"
                        placeholder="XXX-XX-XXXX (SSN) or XX-XXXXXXX (EIN)"
                        value={formData.ssnEin}
                        onChange={(e) => handleInputChange("ssnEin", e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                      />
                      <p className="text-sm text-gray-500/80 mt-2 font-medium">Social Security Number or Employer ID</p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div 
                  className="bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-3xl p-8"
                  style={{
                    boxShadow: `
                      0 20px 40px -12px rgba(0, 0, 0, 0.1),
                      0 8px 16px -6px rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center mr-4"
                      style={{
                        boxShadow: `0 6px 15px -3px rgba(34, 197, 94, 0.15)`
                      }}
                    >
                      <MapPin className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Address Information</h3>
                      <p className="text-gray-600/90 font-medium">Your current mailing address</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">Street Address *</Label>
                      <Input
                        type="text"
                        placeholder="Enter your street address"
                        value={formData.streetAddress}
                        onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold text-gray-900 mb-3 block">
                        Apartment, Suite, etc. <span className="text-gray-500 font-normal">(optional)</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="Apartment, suite, unit, etc."
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                        className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">City *</Label>
                        <Input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">State *</Label>
                        <Input
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-900 mb-3 block">ZIP Code *</Label>
                        <Input
                          type="text"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          className="w-full rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div 
                  className="bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-3xl p-8"
                  style={{
                    boxShadow: `
                      0 20px 40px -12px rgba(0, 0, 0, 0.1),
                      0 8px 16px -6px rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center mr-4"
                      style={{
                        boxShadow: `0 6px 15px -3px rgba(245, 158, 11, 0.15)`
                      }}
                    >
                      <PenTool className="w-7 h-7 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Electronic Signature</h3>
                      <p className="text-gray-600/90 font-medium">Digital signature for form completion</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-base font-semibold text-gray-900 block">Digital Signature *</Label>

                    <Tabs defaultValue="type" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-gray-100/80 backdrop-blur-sm">
                        <TabsTrigger value="type" className="rounded-xl font-semibold">Type Signature</TabsTrigger>
                        <TabsTrigger value="draw" className="rounded-xl font-semibold">Draw Signature</TabsTrigger>
                      </TabsList>
                      <TabsContent value="type" className="space-y-4 mt-6">
                        <Textarea
                          placeholder="Type your full legal name as your electronic signature"
                          value={formData.signature}
                          onChange={(e) => handleInputChange("signature", e.target.value)}
                          className="w-full h-32 resize-none rounded-2xl border-2 border-gray-200/60 bg-white/50 backdrop-blur-sm px-6 py-4 text-base font-medium placeholder:text-gray-400 focus:border-primary focus:bg-white transition-all duration-200 focus:shadow-lg"
                          required
                        />
                        <p className="text-sm text-gray-500/80 font-medium">Type your full legal name. This serves as your electronic signature.</p>
                      </TabsContent>
                      <TabsContent value="draw" className="space-y-4 mt-6">
                        <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
                          <div className="text-center">
                            <PenTool className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <span className="text-sm text-gray-500 font-medium">Drawing signature feature coming soon</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 text-center">
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg group"
                  >
                    {submitting ? (
                      <>
                        <ButtonLoader size="sm" />
                        Submitting Form...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                        Submit & Generate W-9 Form
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Security Notice */}
              <div 
                className="mt-12 pt-8 border-t border-gray-200/60 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-2xl p-6"
                style={{
                  boxShadow: `0 4px 12px -2px rgba(34, 197, 94, 0.1)`
                }}
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-green-700 font-semibold">256-bit SSL Encryption</p>
                    <p className="text-sm text-green-600/80 font-medium">IRS compliant • Fully secure • GDPR protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
