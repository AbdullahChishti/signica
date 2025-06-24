import React from 'react'

interface TableProps {
  children: React.ReactNode
  className?: string
}

interface TableCellProps extends TableProps {
  colSpan?: number
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <table className={`w-full ${className}`}>
      {children}
    </table>
  )
}

export function TableHeader({ children, className = '' }: TableProps) {
  return (
    <thead className={className}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '' }: TableProps) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className = '' }: TableProps) {
  return (
    <tr className={className}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className = '' }: TableProps) {
  return (
    <th className={`text-left font-medium px-6 py-4 ${className}`}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = '', colSpan }: TableCellProps) {
  return (
    <td className={`px-6 py-4 ${className}`} colSpan={colSpan}>
      {children}
    </td>
  )
}
