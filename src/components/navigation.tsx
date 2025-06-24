import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavigationProps {
  currentPage?: 'dashboard' | 'request' | 'form'
  showUserAvatar?: boolean
}

export function Navigation({ currentPage, showUserAvatar = true }: NavigationProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded" style={{ backgroundColor: '#4793ea' }}></div>
            <span className="text-xl font-semibold text-gray-900">TaxForms</span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/admin" 
              className={`font-medium ${
                currentPage === 'dashboard' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/request" 
              className={`font-medium ${
                currentPage === 'request' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New Request
            </Link>
            <Link 
              href="/form/demo" 
              className={`font-medium ${
                currentPage === 'form' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-4' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Preview Form
            </Link>
          </nav>
        </div>

        {showUserAvatar && (
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  )
}
