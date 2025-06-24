import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string
  children: React.ReactNode
}

export function Label({ className = '', children, ...props }: LabelProps) {
  const baseClasses = 'text-sm font-medium text-gray-700'
  
  return (
    <label 
      className={`${baseClasses} ${className}`} 
      {...props}
    >
      {children}
    </label>
  )
}
