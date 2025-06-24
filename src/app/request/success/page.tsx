'use client';

import Link from 'next/link';
import Header from '@/components/Header';

export default function RequestSuccessPage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden" style={{
      '--primary-color': '#4793ea',
      '--secondary-color': '#f0f2f4',
      '--accent-color': '#f8f9fa',
      '--text-primary': '#111418',
      '--text-secondary': '#637488',
      '--text-on-primary': '#ffffff',
      backgroundColor: 'var(--accent-color)'
    } as React.CSSProperties}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                W-9 Request Sent
              </h2>
              <p className="mt-3 text-base text-[var(--text-secondary)]">
                We've successfully sent an email to the recipient with instructions on how to complete the W-9 form. 
                You'll be notified once the form has been submitted.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                href="/admin"
                className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-color)] px-4 py-3 text-sm font-semibold leading-normal tracking-wide text-[var(--text-on-primary)] shadow-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2"
              >
                Back to Dashboard
              </Link>
              <Link
                href="/admin/request"
                className="flex w-full items-center justify-center rounded-lg bg-[var(--accent-color)] px-4 py-3 text-sm font-medium leading-normal tracking-wide text-[var(--text-primary)] shadow-sm transition-colors hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Send Another Request
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              If you have any questions, please{' '}
              <a className="font-medium text-[var(--primary-color)] hover:text-opacity-80" href="#">
                contact support
              </a>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
