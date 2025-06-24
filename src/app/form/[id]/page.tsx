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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded" style={{ backgroundColor: '#4793ea' }}></div>
              <span className="text-xl font-semibold text-gray-900">Form W9 App</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">
                W-9 Form Completion
              </span>
            </nav>
          </div>

          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Complete your W-9 for [Company Name]
          </h1>

          <form className="space-y-6">
            {/* Legal Name */}
            <div className="space-y-2">
              <Label htmlFor="legalName" className="text-sm font-medium text-gray-700">
                Legal Name
              </Label>
              <Input
                id="legalName"
                type="text"
                placeholder="Enter your legal name"
                value={formData.legalName}
                onChange={(e) => handleInputChange("legalName", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                Business Name <span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Tax Classification */}
            <div className="space-y-2">
              <Label htmlFor="taxClassification" className="text-sm font-medium text-gray-700">
                Tax Classification
              </Label>
              <Select onValueChange={(value) => handleInputChange("taxClassification", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your tax classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual/Sole Proprietor</SelectItem>
                  <SelectItem value="c-corp">C Corporation</SelectItem>
                  <SelectItem value="s-corp">S Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="llc">Limited Liability Company</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SSN or EIN */}
            <div className="space-y-2">
              <Label htmlFor="ssnEin" className="text-sm font-medium text-gray-700">
                SSN or EIN
              </Label>
              <Input
                id="ssnEin"
                type="text"
                placeholder="XXX-XX-XXXX or XX-XXXXXXX"
                value={formData.ssnEin}
                onChange={(e) => handleInputChange("ssnEin", e.target.value)}
                className="w-full"
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Address</Label>

              <Input
                type="text"
                placeholder="Enter your street address"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                className="w-full"
              />

              <Input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                value={formData.apartment}
                onChange={(e) => handleInputChange("apartment", e.target.value)}
                className="w-full"
              />

              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
              </div>
            </div>

            {/* Signature Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Signature</Label>

              <Tabs defaultValue="type" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="type">Type</TabsTrigger>
                  <TabsTrigger value="draw">Draw</TabsTrigger>
                </TabsList>
                <TabsContent value="type" className="space-y-2">
                  <Textarea
                    placeholder="Type or draw your signature"
                    value={formData.signature}
                    onChange={(e) => handleInputChange("signature", e.target.value)}
                    className="w-full h-24 resize-none"
                  />
                </TabsContent>
                <TabsContent value="draw" className="space-y-2">
                  <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
                    <span className="text-sm">Drawing signature not implemented in demo</span>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Submit Button */}
            <Button className="w-full text-white py-3 mt-8 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4793ea' }}>Submit & Generate W-9</Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your information is securely encrypted and compliant with IRS regulations.</span>
          </div>
        </div>
      </main>
    </div>
  )
}
