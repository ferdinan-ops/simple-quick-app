import { cn } from '@/lib/utils'
import * as React from 'react'

interface QuickPopupProps {
  children: React.ReactNode
  className?: string
}

export default function QuickPopup({ children, className }: QuickPopupProps) {
  return (
    <div
      className={cn(
        'absolute bottom-[calc(34px+68px+15px)] right-[27px] z-10 flex h-[74%] w-[44%] flex-col rounded bg-white',
        className
      )}
    >
      {children}
    </div>
  )
}
