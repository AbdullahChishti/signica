'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isSettingsPage = pathname === '/settings';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Forms', href: '/forms' },
    { name: 'Help', href: '/help' },
  ];

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--secondary-color)] bg-[var(--background-primary)] px-6 py-3 shadow-sm sm:px-10">
      <div className="flex items-center gap-4 text-[var(--primary-color)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">
            {isAuthPage ? 'Tax Forms Inc.' : 'Form W9 App'}
          </h2>
        </Link>
      </div>

      {!isAuthPage && (
        <div className="flex flex-1 justify-end gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium leading-normal transition-colors ${
                    isActive ? 'text-[var(--primary-color)]' : 'text-[var(--text-primary)] hover:text-[var(--primary-color)]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {pathname === '/' && (
              <Link 
                href="/settings" 
                className="text-sm font-medium leading-normal text-[var(--text-primary)] hover:text-[var(--primary-color)] transition-colors"
              >
                Settings
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isSettingsPage ? (
              <Link 
                href="/" 
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[var(--secondary-color)] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors"
              >
                <span className="truncate">Back to Home</span>
              </Link>
            ) : (
              <Link 
                href="/settings" 
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-[var(--secondary-color)] text-[var(--text-primary)] hover:bg-gray-200 transition-colors"
              >
                <div className="text-[var(--text-primary)]">
                  <svg fill="currentColor" height="20px" viewBox="0 0 24 24" width="20px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
