"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield } from "lucide-react"
import Link from "next/link"
import { getW9RequestById, submitW9FormData } from "@/lib/database"
import type { W9Request } from "@/lib/supabase"
import Header from "@/components/Header"

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading W-9 form...</p>
        </div>
      </div>
    )
  }

  if (error && !request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Unable to Load Form</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Shield className="w-4 h-4 mr-2" />
              IRS Form W-9
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
              Complete your W-9 Information
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please provide your tax information for <span className="font-semibold text-foreground">{request?.vendor_name || 'the requesting company'}</span>.
              All information is encrypted and securely stored.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border bg-card shadow-large overflow-hidden">
            <div className="bg-primary/5 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Tax Information Form</h2>
                  <p className="text-sm text-muted-foreground mt-1">Complete all required fields below</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure & Encrypted</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  </div>

                  {/* Legal Name */}
                  <div className="space-y-3">
                    <Label htmlFor="legalName" className="text-base font-semibold text-foreground">
                      Legal Name (First, Middle, Last)
                    </Label>
                    <Input
                      id="legalName"
                      type="text"
                      placeholder="Enter your full legal name as it appears on your tax return"
                      value={formData.legalName}
                      onChange={(e) => handleInputChange("legalName", e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    />
                    <p className="text-sm text-muted-foreground">Enter your name exactly as it appears on your tax return</p>
                  </div>

                  {/* Business Name */}
                  <div className="space-y-3">
                    <Label htmlFor="businessName" className="text-base font-semibold text-foreground">
                      Business Name <span className="text-muted-foreground font-normal">(if different from above)</span>
                    </Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Enter your business name (optional)"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    />
                    <p className="text-sm text-muted-foreground">Only if your business name is different from your legal name</p>
                  </div>
                </div>

                {/* Tax Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Tax Classification</h3>
                  </div>

                  {/* Tax Classification */}
                  <div className="space-y-3">
                    <Label htmlFor="taxClassification" className="text-base font-semibold text-foreground">
                      Federal Tax Classification
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("taxClassification", value)}>
                      <SelectTrigger className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background focus:ring-2 focus:ring-primary focus:ring-offset-2">
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
                    <p className="text-sm text-muted-foreground">Select the classification that matches your tax filing status</p>
                  </div>

                  {/* SSN or EIN */}
                  <div className="space-y-3">
                    <Label htmlFor="ssnEin" className="text-base font-semibold text-foreground">
                      Taxpayer Identification Number
                    </Label>
                    <Input
                      id="ssnEin"
                      type="text"
                      placeholder="XXX-XX-XXXX (SSN) or XX-XXXXXXX (EIN)"
                      value={formData.ssnEin}
                      onChange={(e) => handleInputChange("ssnEin", e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    />
                    <p className="text-sm text-muted-foreground">Enter your Social Security Number (SSN) or Employer Identification Number (EIN)</p>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-foreground">Street Address</Label>
                      <Input
                        type="text"
                        placeholder="Enter your street address"
                        value={formData.streetAddress}
                        onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-foreground">Apartment, Suite, etc. <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Input
                        type="text"
                        placeholder="Apartment, suite, unit, etc."
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">City</Label>
                        <Input
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">State</Label>
                        <Input
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">ZIP Code</Label>
                        <Input
                          type="text"
                          placeholder="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Electronic Signature</h3>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-foreground">Digital Signature</Label>

                    <Tabs defaultValue="type" className="w-full" onValueChange={(value) => setSignatureType(value as 'typed' | 'drawn')}>
                      <TabsList className="grid w-full grid-cols-2 rounded-xl">
                        <TabsTrigger value="type" className="rounded-lg">Type Signature</TabsTrigger>
                        <TabsTrigger value="draw" className="rounded-lg">Draw Signature</TabsTrigger>
                      </TabsList>
                      <TabsContent value="type" className="space-y-3 mt-4">
                        <Textarea
                          placeholder="Type your full legal name as your electronic signature"
                          value={formData.signature}
                          onChange={(e) => handleInputChange("signature", e.target.value)}
                          className="w-full h-32 resize-none rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                          required
                        />
                        <p className="text-sm text-muted-foreground">Type your full legal name. This serves as your electronic signature.</p>
                      </TabsContent>
                      <TabsContent value="draw" className="space-y-3 mt-4">
                        <div className="w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center text-muted-foreground bg-muted/20">
                          <div className="text-center">
                            <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <span className="text-sm">Drawing signature feature coming soon</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-14 px-8 w-full"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Submitting Form...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Submit & Generate W-9 Form
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-3 text-sm text-muted-foreground">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Your information is protected with 256-bit SSL encryption and is fully compliant with IRS regulations.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
