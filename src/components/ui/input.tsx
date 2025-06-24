import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className = '', ...props }: InputProps) {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  return (
    <input
      className={`${baseClasses} ${className} focus:ring-[#4793ea] focus:border-[#4793ea]`}
      {...props}
    />
  )
}
