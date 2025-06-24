'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Clock, CheckCircle, XCircle, User, Mail, Calendar } from "lucide-react"
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
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'expired':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  // Auth guard handles this

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 lg:px-8">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
              Your W-9 Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Track and manage your W-9 form requests from various companies.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
              <button 
                onClick={loadRequests}
                className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expired</p>
                  <p className="text-3xl font-bold text-foreground">{stats.expired}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="rounded-2xl border bg-card shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">W-9 Requests</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Forms requested by companies for tax reporting purposes
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="px-6 py-4 text-left font-semibold text-foreground">Company</TableHead>
                    <TableHead className="px-6 py-4 text-left font-semibold text-foreground">Request Date</TableHead>
                    <TableHead className="px-6 py-4 text-left font-semibold text-foreground">Status</TableHead>
                    <TableHead className="px-6 py-4 text-left font-semibold text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-foreground">No W-9 requests yet</p>
                            <p className="text-sm text-muted-foreground">You'll see requests here when companies send them to your email</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {request.vendor_name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">For: {request.vendor_name}</p>
                              <p className="text-sm text-muted-foreground">Requested by company</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.status)}
                            <Badge
                              variant={getStatusColor(request.status) as any}
                              className="font-medium capitalize"
                            >
                              {request.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {request.status === 'pending' ? (
                              <Link href={`/form/${request.id}`}>
                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                  Complete Form
                                </Button>
                              </Link>
                            ) : request.status === 'completed' ? (
                              <Button variant="outline" size="sm">
                                View Submission
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" disabled>
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
