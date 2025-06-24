'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

const requestsData = [
  {
    id: 1,
    name: "Ethan Carter",
    email: "ethan.carter@email.com",
    status: "Pending",
  },
  {
    id: 2,
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    status: "Completed",
  },
  {
    id: 3,
    name: "Noah Thompson",
    email: "noah.thompson@email.com",
    status: "Pending",
  },
  {
    id: 4,
    name: "Ava Rodriguez",
    email: "ava.rodriguez@email.com",
    status: "Completed",
  },
  {
    id: 5,
    name: "Liam Walker",
    email: "liam.walker@email.com",
    status: "Pending",
  },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) {
    return <div>Redirecting...</div>
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
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Form W9 App</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <Link href="/admin" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/10 border border-primary/20">
                  Dashboard
                </Link>
                <Link href="/admin/request" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  New Request
                </Link>
                <Link href="/form/demo" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  Preview Form
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-foreground">Welcome, {user.name}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                W-9 Requests
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Manage and track all your Form W-9 requests in one place
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-3xl font-bold text-foreground">{requestsData.length}</p>
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
                <p className="text-3xl font-bold text-foreground">{requestsData.filter(r => r.status === 'Completed').length}</p>
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
                <p className="text-3xl font-bold text-foreground">{requestsData.filter(r => r.status === 'Pending').length}</p>
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
                {requestsData.map((request) => (
                  <TableRow key={request.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{request.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{request.name}</p>
                          <p className="text-sm text-muted-foreground">Vendor</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-primary hover:text-primary/80 cursor-pointer font-medium">{request.email}</p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        variant={request.status === "Completed" ? "success" : "warning"}
                        className="font-medium"
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <LogOut className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
