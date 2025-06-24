"use client"

import React, { useState } from 'react'

interface SelectProps {
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
}

const SelectContext = React.createContext<{
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  value: '',
  setValue: () => {},
  isOpen: false,
  setIsOpen: () => {}
})

export function Select({ onValueChange, children }: SelectProps) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    setIsOpen(false)
    onValueChange?.(newValue)
  }

  return (
    <SelectContext.Provider value={{ value, setValue: handleValueChange, isOpen, setIsOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ className = '', children }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)
  
  return (
    <button
      type="button"
      className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  )
}

export function SelectContent({ children }: SelectContentProps) {
  const { isOpen } = React.useContext(SelectContext)
  
  if (!isOpen) return null
  
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
      {children}
    </div>
  )
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { setValue } = React.useContext(SelectContext)
  
  return (
    <div
      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
      onClick={() => setValue(value)}
    >
      {children}
    </div>
  )
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)
  
  return (
    <span className={value ? 'text-gray-900' : 'text-gray-500'}>
      {value || placeholder}
    </span>
  )
}
