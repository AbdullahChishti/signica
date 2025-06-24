import React from 'react'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export function Badge({ variant = 'default', className = '', style, children }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-orange-100 text-orange-800'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <span className={classes} style={style}>
      {children}
    </span>
  )
}
