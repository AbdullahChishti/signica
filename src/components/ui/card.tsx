import React from 'react'

interface CardProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

interface CardContentProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export function Card({ className = '', style, children }: CardProps) {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white shadow-sm text-gray-900'

  return (
    <div className={`${baseClasses} ${className}`} style={style}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', style, children }: CardContentProps) {
  const baseClasses = 'p-6 text-inherit'

  return (
    <div className={`${baseClasses} ${className}`} style={style}>
      {children}
    </div>
  )
}
