'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, Shield, Send, FileText, LucideIcon, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  active?: boolean;
  badge?: string;
}

interface PageContext {
  navType: 'home' | 'admin' | 'form' | 'request' | 'settings' | 'default';
  icon: LucideIcon;
  navItems: NavItem[];
}

export default function Header() {
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  // Determine page context and navigation
  const getPageContext = (): PageContext => {
    if (pathname === '/') {
      return {
        navType: 'home',
        icon: Shield,
        navItems: [
          { name: 'Features', href: '#features' },
          { name: 'How It Works', href: '#how-it-works' },
        ]
      };
    }
    
    if (pathname.startsWith('/admin')) {
      return {
        navType: 'admin',
        icon: Shield,
        navItems: [
          { name: 'Dashboard', href: '/admin', active: pathname === '/admin' },
          { name: 'New Request', href: '/admin/request', active: pathname === '/admin/request' },
        ]
      };
    }
    
    if (pathname.startsWith('/form/')) {
      if (pathname.includes('/success')) {
        return {
          navType: 'form',
          icon: Shield,
          navItems: [
            { name: 'Form Completed', href: '#', active: true, badge: 'Success' }
          ]
        };
      }
      return {
        navType: 'form',
        icon: Shield,
        navItems: [
          { name: 'W-9 Form Completion', href: '#', active: true, badge: 'Secure' }
        ]
      };
    }
    
    if (pathname.startsWith('/request/success')) {
      return {
        navType: 'request',
        icon: Send,
        navItems: [
          { name: 'Request Sent', href: '#', active: true, badge: 'Success' }
        ]
      };
    }
    
    if (pathname.startsWith('/settings')) {
      return {
        navType: 'settings',
        icon: Settings,
        navItems: [
          { name: 'Account Settings', href: '#', active: true }
        ]
      };
    }
    
    // Default for other pages
    return {
      navType: 'default',
      icon: Shield,
      navItems: []
    };
  };

  const { navType, icon: PageIcon, navItems } = getPageContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <PageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Signica</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((link, index) => (
                <div key={`${link.name}-${index}`} className="flex items-center">
                  {link.href === '#' ? (
                    <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      link.active 
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-muted-foreground'
                    }`}>
                      {navType === 'form' && <Shield className="w-4 h-4 mr-2" />}
                      {navType === 'request' && <Send className="w-4 h-4 mr-2" />}
                      {navType === 'settings' && <Settings className="w-4 h-4 mr-2" />}
                      {link.name}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        link.active
                          ? 'text-primary bg-primary/10 border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.badge && (
                    <div className={`ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      link.badge === 'Success' 
                        ? 'bg-green-100 text-green-700'
                        : link.badge === 'Secure'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {link.badge === 'Secure' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>}
                      {link.badge === 'Success' && <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>}
                      {link.badge}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Show secure connection indicator for form pages */}
            {navType === 'form' && (
              <div className="hidden sm:flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Secure Connection
              </div>
            )}

            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-12 w-12 rounded-2xl hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-semibold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-72 mr-4 mt-2 border-0 bg-white/95 backdrop-blur-sm rounded-3xl p-0 overflow-hidden"
                  align="end" 
                  forceMount
                  style={{
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.25),
                      0 10px 20px -8px rgba(0, 0, 0, 0.15),
                      0 4px 15px -3px rgba(0, 0, 0, 0.1),
                      0 0 0 1px rgba(0, 0, 0, 0.05)
                    `
                  }}
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 p-6 border-b border-gray-200/60">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 ring-2 ring-primary/30 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-lg font-bold text-gray-900 truncate">{user.email.split('@')[0]}</p>
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100/80 border border-green-200/60">
                            <Sparkles className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">Pro</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600/90 font-medium truncate">{user.email}</p>
                        <p className="text-xs text-gray-500/80 font-medium mt-1">Account active</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/admin"
                        className="flex items-center w-full px-4 py-3 rounded-2xl text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                      >
                        <div 
                          className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors duration-200"
                          style={{
                            boxShadow: `0 4px 10px -2px rgba(99, 102, 241, 0.1)`
                          }}
                        >
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">Dashboard</p>
                          <p className="text-xs text-gray-500/80">Manage W-9 requests</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link 
                        href="/settings"
                        className="flex items-center w-full px-4 py-3 rounded-2xl text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                      >
                        <div 
                          className="w-10 h-10 rounded-xl bg-purple-100/80 flex items-center justify-center mr-3 group-hover:bg-purple-200/80 transition-colors duration-200"
                          style={{
                            boxShadow: `0 4px 10px -2px rgba(168, 85, 247, 0.1)`
                          }}
                        >
                          <Settings className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Settings</p>
                          <p className="text-xs text-gray-500/80">Account preferences</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <div className="my-2 mx-4 border-t border-gray-200/60"></div>

                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 rounded-2xl text-gray-700 hover:bg-red-50/80 hover:text-red-700 transition-all duration-200 group cursor-pointer"
                    >
                      <div 
                        className="w-10 h-10 rounded-xl bg-red-100/80 flex items-center justify-center mr-3 group-hover:bg-red-200/80 transition-colors duration-200"
                        style={{
                          boxShadow: `0 4px 10px -2px rgba(239, 68, 68, 0.1)`
                        }}
                      >
                        <LogOut className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Sign out</p>
                        <p className="text-xs text-gray-500/80">End your session</p>
                      </div>
                    </DropdownMenuItem>
                  </div>

                  {/* Footer */}
                  <div 
                    className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 px-4 py-3 border-t border-gray-200/60"
                    style={{
                      boxShadow: `0 -4px 12px -2px rgba(34, 197, 94, 0.05)`
                    }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-700">All systems operational</span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
