import * as React from 'react'
import { cn } from '@/lib/utils'
type InputProps = {
  variant?: 'default' | 'hidden'
} & React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex flex-1 rounded-md border border-gray3 text-sm text-gray2',
          variant === 'default' && 'h-10 px-4 focus:border-gray3 focus:outline-none',
          variant === 'hidden' && 'h-fit w-full border-none p-0 focus:border-none focus:outline-none',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
export { Input }
