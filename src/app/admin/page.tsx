'use client'

import { useEffect, useState } from "react"
import { Plus, TrendingUp, Users, CheckCircle, Clock, Download, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/Header"
import { getW9Requests, getW9RequestStats } from "@/lib/database"
import { RequireAuth } from "@/components/AuthGuard"
import type { W9Request } from "@/lib/supabase"
import { CardLoader } from "@/components/ui/loader"

// Remove hardcoded data - we'll use real Supabase data

export default function AdminDashboard() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<W9Request[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, expired: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load W9 requests and stats
  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [requestsData, statsData] = await Promise.all([
        getW9Requests(user!.id),
        getW9RequestStats(user!.id)
      ])

      setRequests(requestsData)
      setStats(statsData)
    } catch (error: any) {
      console.error('Error loading data:', error)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (requestId: string, vendorName: string) => {
    try {
      const response = await fetch(`/api/download-w9/${requestId}`)

      if (!response.ok) {
        throw new Error('Failed to download PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `W9_${vendorName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        <main className="container mx-auto px-6 py-12 lg:px-8 max-w-6xl">
          <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
            <CardLoader text="Loading your command center..." />
          </div>
        </main>
      </div>
    )
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 lg:px-8 max-w-7xl">
          
          {/* Page Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mission Control</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              W-9 Command
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Center
              </span>
            </h1>
            
            <p className="text-xl text-gray-600/90 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Your mission control for W-9s. <span className="text-gray-700">Track, monitor, celebrate.</span>
            </p>

            <Link href="/admin/request">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Request
                <div className="ml-2 group-hover:translate-x-0.5 transition-transform">
                  →
                </div>
              </Button>
            </Link>
          </div>

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
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={loadData}
                className="mt-3 text-red-800 hover:text-red-900 underline underline-offset-2 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Total Requests Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Requests</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {stats.total}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {stats.total > 0 
                  ? `${Math.round((stats.completed / stats.total) * 100)}% completion rate`
                  : "Ready to start collecting"
                }
              </p>
            </div>

            {/* Completed Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 mb-1">Completed</p>
                  <p className="text-4xl font-bold text-green-600">
                    {stats.completed}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {stats.completed > 0 
                  ? "Ready for download"
                  : "Waiting for completions"
                }
              </p>
            </div>

            {/* Pending Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
                  <p className="text-4xl font-bold text-amber-600">
                    {stats.pending}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {stats.pending > 0 
                  ? "Awaiting vendor response"
                  : "All caught up!"
                }
              </p>
            </div>
          </div>

          {/* Requests Table */}
          <div 
            className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl overflow-hidden"
            style={{
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 10px 20px -8px rgba(0, 0, 0, 0.15),
                0 4px 15px -3px rgba(0, 0, 0, 0.1)
              `
            }}
          >
            {/* Table Header */}
            <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-gray-50/50 to-gray-100/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Requests</h2>
              <p className="text-gray-600">
                Track the status of all W-9 form requests
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/60 hover:bg-transparent">
                    <TableHead className="font-semibold text-gray-900 px-8 py-6 text-left">Vendor</TableHead>
                    <TableHead className="font-semibold text-gray-900 px-8 py-6 text-left">Contact</TableHead>
                    <TableHead className="font-semibold text-gray-900 px-8 py-6 text-left">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900 px-8 py-6 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="px-8 py-16 text-center">
                        <div className="flex flex-col items-center space-y-6">
                          <div 
                            className="w-24 h-24 rounded-3xl bg-gradient-to-r from-primary/10 to-blue-600/10 flex items-center justify-center"
                            style={{
                              boxShadow: `
                                0 10px 25px -5px rgba(99, 102, 241, 0.1),
                                0 4px 10px -2px rgba(99, 102, 241, 0.05)
                              `
                            }}
                          >
                            <Users className="w-12 h-12 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No W-9 requests yet</h3>
                            <p className="text-gray-600 mb-6 max-w-md">
                              Create your first request to start collecting W-9 forms from your vendors
                            </p>
                            <Link href="/admin/request">
                              <Button 
                                size="lg"
                                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                              >
                                <Plus className="w-5 h-5 mr-2" />
                                Create First Request
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request.id} className="border-b border-gray-200/60 hover:bg-gray-50/50 transition-all duration-200">
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center"
                              style={{
                                boxShadow: `0 4px 10px -2px rgba(99, 102, 241, 0.1)`
                              }}
                            >
                              <span className="text-sm font-bold text-primary">
                                {request.vendor_name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">{request.vendor_name}</p>
                              <p className="text-sm text-gray-500">Vendor</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <p className="text-primary hover:text-primary/80 cursor-pointer font-medium transition-colors">
                            {request.vendor_email}
                          </p>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <Badge
                            variant={request.status === "completed" ? "default" : request.status === "pending" ? "secondary" : "secondary"}
                            className={`font-medium capitalize px-4 py-2 rounded-xl ${
                              request.status === "completed" 
                                ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                : request.status === "pending" 
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <Link href={`/form/${request.id}`}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-gray-300 hover:border-primary hover:text-primary transition-all duration-200 rounded-xl"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Form
                              </Button>
                            </Link>
                            {request.status === 'completed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-300 text-green-700 hover:border-green-500 hover:text-green-800 transition-all duration-200 rounded-xl"
                                onClick={() => handleDownload(request.id, request.vendor_name)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  )
}
