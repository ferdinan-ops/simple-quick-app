import * as React from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  variant: 'default' | 'hidden'
  onInput?: React.FormEventHandler<HTMLTextAreaElement>
  onBlur?: () => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, onInput, onBlur, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
    const [onEdit, setOnEdit] = React.useState(false)

    React.useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement)

    React.useLayoutEffect(() => {
      if (innerRef.current) {
        innerRef.current.style.height = '0px'
        innerRef.current.style.height = innerRef.current.scrollHeight + 'px'
      }
    }, [props.value])

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const el = e.currentTarget
      el.style.height = '0px'
      el.style.height = el.scrollHeight + 'px'

      onInput?.(e)
    }

    return (
      <textarea
        ref={innerRef}
        onInput={handleInput}
        readOnly={variant === 'hidden' && !onEdit}
        onClick={() => variant === 'hidden' && setOnEdit(true)}
        onBlur={() => {
          if (variant === 'hidden') setOnEdit(false)
          onBlur?.()
        }}
        className={cn(
          'flex flex-1 resize-none overflow-hidden border border-gray3 text-sm text-gray2 focus:outline-none',
          variant === 'default' && 'min-h-[40px] px-4 py-2',
          variant === 'hidden' && 'h-auto w-full border-none p-0',
          variant === 'hidden' && !onEdit && 'hover:cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
