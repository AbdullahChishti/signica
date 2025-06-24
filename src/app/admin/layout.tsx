import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Form W9 App',
  description: 'Admin dashboard for managing W-9 requests',
}

// Prevent caching of admin routes
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
