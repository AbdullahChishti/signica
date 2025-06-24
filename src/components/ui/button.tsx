import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  style,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variantClasses = {
    default: 'text-white hover:opacity-90 focus:ring-blue-500 transition-opacity',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-8 py-3 text-lg'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  // Add default background color for default variant
  const buttonStyle = variant === 'default' && !style?.backgroundColor
    ? { backgroundColor: '#4793ea', ...style }
    : style

  return (
    <button className={classes} style={buttonStyle} {...props}>
      {children}
    </button>
  )
}
