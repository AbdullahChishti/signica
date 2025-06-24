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
              <Link href="/admin" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">
                Dashboard
              </Link>
              <Link href="/admin/request" className="text-gray-600 hover:text-gray-900 font-medium">
                New Request
              </Link>
              <Link href="/form/demo" className="text-gray-600 hover:text-gray-900 font-medium">
                Preview Form
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">W-9 Requests</h1>
              <Link href="/admin/request">
                <Button className="text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4793ea' }}>
                  <Plus className="w-4 h-4 mr-2" />
                  New W-9 Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium text-gray-900">Name</TableHead>
                  <TableHead className="font-medium text-gray-900">Email</TableHead>
                  <TableHead className="font-medium text-gray-900">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestsData.map((request) => (
                  <TableRow key={request.id} className="hover:bg-gray-50 border-t border-gray-200">
                    <TableCell className="font-medium text-gray-900">{request.name}</TableCell>
                    <TableCell className="text-blue-600 hover:text-blue-800 cursor-pointer">{request.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={request.status === "Completed" ? "success" : "warning"}
                      >
                        {request.status}
                      </Badge>
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
