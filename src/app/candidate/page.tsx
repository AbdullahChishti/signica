'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Clock, CheckCircle, XCircle, User, Mail, Calendar, Sparkles, ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { getW9RequestsByEmail } from "@/lib/database"
import { RequireAuth } from "@/components/AuthGuard"
import type { W9Request } from "@/lib/supabase"
import Header from "@/components/Header"

export default function CandidateDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [requests, setRequests] = useState<W9Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Auth guard will handle authentication

  // Load W9 requests for this candidate
  useEffect(() => {
    if (user) {
      loadRequests()
    }
  }, [user])

  const loadRequests = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Get requests sent to this user's email
      const requestsData = await getW9RequestsByEmail(user!.email)
      setRequests(requestsData)
    } catch (error: any) {
      console.error('Error loading requests:', error)
      setError('Failed to load W-9 requests')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'expired':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  // Auth guard handles this

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    completed: requests.filter(r => r.status === 'completed').length,
    expired: requests.filter(r => r.status === 'expired').length
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
              <span className="text-sm font-medium text-primary">Your Personal Hub</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your W-9
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                Dashboard
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Track and manage your W-9 form requests from various companies. Complete them quickly and securely.
            </p>
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
                onClick={loadRequests}
                className="mt-3 text-red-800 hover:text-red-900 underline underline-offset-2 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            
            {/* Total Requests Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-6 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-500 mb-1">Total Requests</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {stats.total}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {stats.total > 0 ? "From companies" : "No requests yet"}
              </p>
            </div>

            {/* Pending Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-6 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-500 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {stats.pending}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {stats.pending > 0 ? "Need your action" : "All done!"}
              </p>
            </div>

            {/* Completed Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-6 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-500 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.completed}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {stats.completed > 0 ? "Successfully submitted" : "None yet"}
              </p>
            </div>

            {/* Expired Card */}
            <div 
              className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-6 group hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.15),
                  0 10px 20px -8px rgba(0, 0, 0, 0.1),
                  0 4px 15px -3px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <XCircle className="w-7 h-7 text-red-600" />
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-500 mb-1">Expired</p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.expired}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {stats.expired > 0 ? "Past deadline" : "None expired"}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">W-9 Requests</h2>
              <p className="text-gray-600">
                Forms requested by companies for tax reporting purposes
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/60 hover:bg-transparent">
                    <TableHead className="px-8 py-6 text-left font-semibold text-gray-900">Company</TableHead>
                    <TableHead className="px-8 py-6 text-left font-semibold text-gray-900">Request Date</TableHead>
                    <TableHead className="px-8 py-6 text-left font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="px-8 py-6 text-left font-semibold text-gray-900">Actions</TableHead>
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
                            <FileText className="w-12 h-12 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No W-9 requests yet</h3>
                            <p className="text-gray-600 max-w-md">
                              You'll see requests here when companies send them to your email address
                            </p>
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
                              <p className="font-semibold text-gray-900 text-lg">For: {request.vendor_name}</p>
                              <p className="text-sm text-gray-500">Requested by company</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700 font-medium">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(request.status)}
                            <Badge
                              variant={getStatusColor(request.status) as any}
                              className={`font-medium capitalize px-4 py-2 rounded-xl ${
                                request.status === "completed" 
                                  ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                  : request.status === "pending" 
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  : "bg-red-100 text-red-700 hover:bg-red-200"
                              }`}
                            >
                              {request.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            {request.status === 'pending' ? (
                              <Link href={`/form/${request.id}`}>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-medium px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Complete Form
                                </Button>
                              </Link>
                            ) : request.status === 'completed' ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-green-300 text-green-700 hover:border-green-500 hover:text-green-800 transition-all duration-200 rounded-xl"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                View Submission
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled
                                className="border-red-300 text-red-500 rounded-xl"
                              >
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Expired
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
