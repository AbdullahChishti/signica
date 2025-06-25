'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Shield, Send, FileText, LucideIcon, User, Sparkles, CheckCircle, Award } from 'lucide-react';

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
  const { user, logout, isInitialized } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Determine page context and navigation
  const getPageContext = (): PageContext => {

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900">SecureW9</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((link, index) => (
                <div key={`${link.name}-${index}`} className="flex items-center">
                  {link.href === '#' ? (
                    <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      link.active 
                        ? 'text-blue-700 bg-blue-50 border border-blue-200/60 shadow-sm'
                        : 'text-slate-600'
                    }`}>
                      {navType === 'form' && <Shield className="w-4 h-4 mr-2 text-emerald-600" />}
                      {navType === 'request' && <Send className="w-4 h-4 mr-2 text-blue-600" />}
                      {navType === 'settings' && <Settings className="w-4 h-4 mr-2 text-purple-600" />}
                      {link.name}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        link.active
                          ? 'text-blue-700 bg-blue-50 border border-blue-200/60 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.badge && (
                    <div className={`ml-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
                      link.badge === 'Success' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : link.badge === 'Secure'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : 'bg-blue-50 text-blue-700 border-blue-200/60'
                    }`}>
                      {link.badge === 'Secure' && <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>}
                      {link.badge === 'Success' && <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>}
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
              <div className="hidden sm:flex items-center rounded-full bg-emerald-50 border border-emerald-200/60 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Secure Connection
              </div>
            )}

            {isInitialized && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-12 w-12 rounded-2xl hover:bg-slate-50 transition-all duration-200 group border border-slate-200/60 hover:border-slate-300/60 shadow-sm hover:shadow-md"
                  >
                    <Avatar className="h-9 w-9 ring-2 ring-blue-200/60 group-hover:ring-blue-300/60 transition-all duration-200">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-80 mr-4 mt-3 border-0 bg-white/70 backdrop-blur-2xl rounded-3xl p-0 overflow-hidden shadow-2xl"
                  align="end" 
                  forceMount
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.15),
                      0 10px 25px -8px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.6)
                    `
                  }}
                >
                  {/* Glassmorphic Profile Header */}
                  <div className="relative p-6 border-b border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 ring-2 ring-white/40 shadow-xl border-0">
                          <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xl">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 truncate mb-1">{user.name}</h3>
                        <p className="text-sm text-slate-600 truncate mb-2">{user.email}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm border border-white/30">
                          <Shield className="w-3 h-3 text-emerald-600" />
                          <span className="text-xs font-semibold text-slate-700">Enterprise</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Minimal Menu Items */}
                  <div className="p-4 space-y-2">
                    <DropdownMenuItem asChild>
                      <Link 
                        href="/admin"
                        className="flex items-center w-full p-4 rounded-2xl text-slate-700 hover:bg-white/40 hover:backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/30"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center mr-4 group-hover:scale-105 transition-all duration-300">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Dashboard</p>
                          <p className="text-sm text-slate-600">Manage requests</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link 
                        href="/settings"
                        className="flex items-center w-full p-4 rounded-2xl text-slate-700 hover:bg-white/40 hover:backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/30"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center mr-4 group-hover:scale-105 transition-all duration-300">
                          <Settings className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Settings</p>
                          <p className="text-sm text-slate-600">Preferences</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <div className="border-t border-white/20 pt-2 mt-4">
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="flex items-center w-full p-4 rounded-2xl text-slate-700 hover:bg-red-50/60 hover:backdrop-blur-sm transition-all duration-300 group cursor-pointer border border-transparent hover:border-red-200/40"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center mr-4 group-hover:scale-105 transition-all duration-300">
                          <LogOut className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">Sign Out</p>
                          <p className="text-sm text-slate-600">End session</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </div>

                  {/* Minimal Footer */}
                  <div className="px-6 py-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-600">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                asChild
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
