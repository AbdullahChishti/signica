import React from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'minimal' | 'card' | 'fullscreen'
  text?: string
  className?: string
}

const sizeClasses = {
  sm: {
    container: 'w-8 h-8',
    spinner: 'w-5 h-5',
    text: 'text-sm'
  },
  md: {
    container: 'w-12 h-12',
    spinner: 'w-7 h-7',
    text: 'text-base'
  },
  lg: {
    container: 'w-16 h-16',
    spinner: 'w-10 h-10',
    text: 'text-lg'
  },
  xl: {
    container: 'w-24 h-24',
    spinner: 'w-14 h-14',
    text: 'text-xl'
  }
}

export function Loader({ 
  size = 'md', 
  variant = 'default', 
  text, 
  className 
}: LoaderProps) {
  const sizeClass = sizeClasses[size]

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center z-50">
        {/* Glassmorphic Loading Card */}
        <div 
          className="bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 10px 20px -8px rgba(0, 0, 0, 0.15),
              0 4px 15px -3px rgba(0, 0, 0, 0.1)
            `
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>

          <div className="relative">
            {/* Loading Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Loading</span>
            </div>

            {/* Main Spinner */}
            <div className="flex justify-center mb-8">
              <div 
                className="w-16 h-16 rounded-3xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center"
                style={{
                  boxShadow: `
                    0 10px 25px -5px rgba(99, 102, 241, 0.2),
                    0 4px 10px -2px rgba(99, 102, 241, 0.1)
                  `
                }}
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>

            {/* Loading Text */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {text || 'Loading...'}
                </span>
              </h2>
              <p className="text-gray-600/90 font-medium">
                Just a moment <span className="text-gray-700">while we prepare everything</span>
              </p>
            </div>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div 
        className={cn(
          "bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 text-center",
          className
        )}
        style={{
          boxShadow: `
            0 20px 40px -12px rgba(0, 0, 0, 0.15),
            0 8px 16px -6px rgba(0, 0, 0, 0.1),
            0 3px 12px -2px rgba(0, 0, 0, 0.05)
          `
        }}
      >
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={cn(
              "rounded-2xl bg-gradient-to-r from-primary/20 to-blue-600/20 flex items-center justify-center",
              sizeClass.container
            )}
            style={{
              boxShadow: `0 6px 15px -3px rgba(99, 102, 241, 0.15)`
            }}
          >
            <Loader2 className={cn("text-primary animate-spin", sizeClass.spinner)} />
          </div>
          {text && (
            <p className={cn("font-medium text-gray-700", sizeClass.text)}>
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center space-x-3", className)}>
        <Loader2 className={cn("text-primary animate-spin", sizeClass.spinner)} />
        {text && (
          <span className={cn("font-medium text-gray-700", sizeClass.text)}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      <div 
        className={cn(
          "rounded-2xl bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 flex items-center justify-center",
          sizeClass.container
        )}
        style={{
          boxShadow: `0 4px 12px -2px rgba(99, 102, 241, 0.1)`
        }}
      >
        <Loader2 className={cn("text-primary animate-spin", sizeClass.spinner)} />
      </div>
      {text && (
        <p className={cn("font-medium text-gray-600/90", sizeClass.text)}>
          {text}
        </p>
      )}
    </div>
  )
}

// Preset loader components for common use cases
export function PageLoader({ text }: { text?: string }) {
  return <Loader variant="fullscreen" size="lg" text={text} />
}

export function CardLoader({ text, className }: { text?: string, className?: string }) {
  return <Loader variant="card" size="md" text={text} className={className} />
}

export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return <Loader variant="minimal" size={size} />
}

export function InlineLoader({ text, size = 'sm' }: { text?: string, size?: 'sm' | 'md' }) {
  return <Loader variant="minimal" size={size} text={text} />
} 