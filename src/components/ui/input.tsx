import * as React from 'react'
import { cn } from '@/lib/utils'
type InputProps = {
  variant: 'default' | 'hidden'
} & React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex flex-1 border border-gray3 bg-black text-sm text-gray2 focus:border-none focus:outline-none',
        variant === 'default' && 'h-10 px-4',
        variant === 'hidden' && 'h-fit w-full border-none p-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'
export { Input }
