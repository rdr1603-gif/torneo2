import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const cardVariants = cva('rounded-lg border bg-white shadow-sm transition-all', {
  variants: {
    variant: {
      default: 'border-gray-200',
      primary: 'border-primary bg-primary/5',
      success: 'border-green-200 bg-green-50',
      error: 'border-red-200 bg-red-50',
      warning: 'border-yellow-200 bg-yellow-50'
    },
    hover: {
      true: 'hover:shadow-md hover:border-gray-300',
      false: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    hover: false
  }
})

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode
}

export function Card({
  className,
  variant,
  hover,
  children,
  ...props
}: CardProps) {
  return (
    <div className={clsx(cardVariants({ variant, hover }), 'p-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('mb-4 pb-4 border-b border-gray-200', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('mt-4 pt-4 border-t border-gray-200 flex justify-between items-center', className)}>{children}</div>
}
