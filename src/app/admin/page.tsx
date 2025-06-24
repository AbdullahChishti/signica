'use client'

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/Header"
import { getW9Requests, getW9RequestStats } from "@/lib/database"
import { RequireAuth } from "@/components/AuthGuard"
import type { W9Request } from "@/lib/supabase"

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100">
        <Header />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  W-9 Command Center
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Your mission control for W-9 forms. Track requests, celebrate completions.
                </p>
              </div>
              <Link href="/admin/request">
                <Button className="inline-flex items-center justify-center rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl h-12 px-6">
                  <Plus className="w-5 h-5 mr-2" />
                  New W-9 Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={loadData}
                className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
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
                  <Plus className="w-6 h-6 text-green-600" />
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
                  <Plus className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">

            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Recent Requests</h2>
              <p className="text-sm text-muted-foreground mt-1">Track the status of all W-9 form requests</p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="font-semibold text-foreground px-6 py-4">Vendor</TableHead>
                    <TableHead className="font-semibold text-foreground px-6 py-4">Contact</TableHead>
                    <TableHead className="font-semibold text-foreground px-6 py-4">Status</TableHead>
                    <TableHead className="font-semibold text-foreground px-6 py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-foreground">No W-9 requests yet</p>
                            <p className="text-sm text-muted-foreground">Create your first request to get started</p>
                          </div>
                          <Link href="/admin/request">
                            <Button className="mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Create First Request
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">{request.vendor_name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{request.vendor_name}</p>
                              <p className="text-sm text-muted-foreground">Vendor</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <p className="text-primary hover:text-primary/80 cursor-pointer font-medium">{request.vendor_email}</p>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge
                            variant={request.status === "completed" ? "success" : request.status === "pending" ? "warning" : "secondary"}
                            className="font-medium capitalize"
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link href={`/form/${request.id}`}>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                View Form
                              </Button>
                            </Link>
                            {request.status === 'completed' && (
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
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
