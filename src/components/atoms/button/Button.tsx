import * as React from 'react'

import { cn } from '@/lib/utils'
import { LoadingIcon } from '@/assets/icons'

export type ButtonProps = {
  variant?: 'outline' | 'default' | 'icon'
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ variant = 'default', className, children, loading, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'relative flex h-10 items-center gap-2 overflow-hidden rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-80',
        variant === 'outline' && 'border border-gray3 bg-white text-gray2 hover:bg-neutral-100',
        variant === 'icon' && 'h-5 w-5 items-center justify-center bg-white p-0 hover:bg-neutral-100',
        loading && 'pointer-events-none disabled:text-transparent',
        className
      )}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingIcon size={12} strokeWidth={4} />
        </div>
      )}
      {children}
    </button>
  )
}
