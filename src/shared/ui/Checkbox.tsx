import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/cn'

export function Checkbox({ className, ...props }: Omit<ComponentProps<'input'>, 'type'>) {
  return (
    <input
      type="checkbox"
      className={cn('size-4 shrink-0 cursor-pointer accent-primary', className)}
      {...props}
    />
  )
}
