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
import { LogOut, Settings, Shield, Send, FileText, LucideIcon } from 'lucide-react';

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

            {isInitialized && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
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
