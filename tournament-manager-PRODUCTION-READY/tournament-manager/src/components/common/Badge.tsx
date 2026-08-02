import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const badgeVariants = cva('inline-flex items-center rounded-full font-medium transition-colors', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-900',
      primary: 'bg-primary/10 text-primary',
      success: 'bg-green-100 text-green-900',
      error: 'bg-red-100 text-red-900',
      warning: 'bg-yellow-100 text-yellow-900',
      info: 'bg-blue-100 text-blue-900'
    },
    size: {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  label: string
  icon?: React.ReactNode
  className?: string
}

export function Badge({ label, variant, size, icon, className }: BadgeProps) {
  return (
    <div className={clsx(badgeVariants({ variant, size }), className)}>
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </div>
  )
}
