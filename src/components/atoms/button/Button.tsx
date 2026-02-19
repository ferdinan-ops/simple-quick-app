import * as React from 'react'

import { cn } from '@/lib/utils'

export type ButtonProps = {
  variant?: 'outline' | 'default' | 'icon'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover',
        variant === 'outline' && 'border border-gray3 bg-white text-gray2 hover:bg-neutral-100',
        variant === 'icon' && 'h-5 w-5 items-center justify-center bg-white p-0 hover:bg-neutral-100',
        className
      )}
      {...props}
    />
  )
}
