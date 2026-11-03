import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

export function Card({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn('overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
}
