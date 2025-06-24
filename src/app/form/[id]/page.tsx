"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function W9FormCompletion() {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Form W9 App</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center">
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 border border-primary/20">
                  <Shield className="w-4 h-4 mr-2" />
                  W-9 Form Completion
                </div>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Secure Connection
              </div>
            </div>
          </div>
        </div>
      </header>

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
              Please provide your tax information for <span className="font-semibold text-foreground">[Company Name]</span>.
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

              <form className="space-y-8">
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

                    <Tabs defaultValue="type" className="w-full">
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
                  <Link href="/form/success">
                    <Button className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-14 px-8 w-full">
                      <Shield className="w-5 h-5 mr-2" />
                      Submit & Generate W-9 Form
                    </Button>
                  </Link>
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
