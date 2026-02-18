import { cn } from '@/lib/utils'
import * as React from 'react'

interface MainPopupLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function MainPopupLayout({ children, className }: MainPopupLayoutProps) {
  return (
    <div className={cn('flex h-full flex-1 flex-col items-center justify-center gap-6', className)}>{children}</div>
  )
}
