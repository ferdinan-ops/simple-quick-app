import { cn } from '@/lib/utils'

type FloatButtonProps = {
  children: React.ReactNode
  className?: string
  size?: 'large' | 'small'
  fixed?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function FloatButton({ children, className, size = 'small', fixed = true, ...props }: FloatButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-full transition-all',
        size === 'large' ? 'h-[68px] w-[68px]' : 'h-[60px] w-[60px]',
        fixed && 'absolute',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
